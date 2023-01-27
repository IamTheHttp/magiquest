import {MOVEMENT, CONTROLLED_BY_AI, POSITION, PLAYER_CONTROLLED} from '../components/_ComponentNames';
import Moving from '../components/Moving';
import oneOf from '../utils/oneOf';
import {TILE_SIZE, DIRECTIONS} from '../gameConstants';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import IsAttackingComp from 'gameEngine/components/Attacking';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function aiSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps<BaseEntity>([CONTROLLED_BY_AI, MOVEMENT, POSITION]);
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

  entityLoop(entities, (entity) => {
    if (entity.isMoving()) {
      return;
    }

    let visionRange = entity.getAIVisionRange();
    let chaseDirections = [];

    if (visionRange && player) {
      let {x: playerX, y: playerY} = player.getPos();
      let {x, y} = entity.getPos();
      let dist = Math.sqrt(Math.pow(playerX - x, 2) + Math.pow(playerY - y, 2));

      // chase
      /* istanbul ignore else */
      if (visionRange > dist) {
        // go towards the player!
        if (x < playerX) {
          chaseDirections.push(DIRECTIONS.RIGHT);
        }

        if (x > playerX) {
          chaseDirections.push(DIRECTIONS.LEFT);
        }

        if (y < playerY) {
          chaseDirections.push(DIRECTIONS.DOWN);
        }

        if (y > playerY) {
          chaseDirections.push(DIRECTIONS.UP);
        }
      }

      // attack if close
      let isNextToPlayer = false;

      if (x === playerX) {
        isNextToPlayer = Math.abs(playerY - y) === TILE_SIZE;
      } else if (y === playerY) {
        isNextToPlayer = Math.abs(playerX - x) === TILE_SIZE;
      }

      let isCurrentlyAttacking = entity.isAttacking();

      if (isNextToPlayer && !isCurrentlyAttacking) {
        let playerTileIdx = getTileIdxByEnt(player);

        let tileToAttack = systemArguments.indexedTileMap[playerTileIdx];
        entity.addComponent(new IsAttackingComp(tileToAttack));
      }
    }

    if (chaseDirections.length === 0) {
      // TODO - Could we implement break this list dynamically instead of listing it all?
      chaseDirections = [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT];
    }

    let dir = oneOf(chaseDirections);

    entity.setDestTo(dir);
    entity.addComponent(new Moving());
  });
}

export default aiSystem;
