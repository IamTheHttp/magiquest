import {
  MOVEMENT_COMP,
  AI_CONTROLLED_COMP,
  POSITION_COMP,
  PLAYER_CONTROLLED_COMP
} from '../components/_ComponentNamesConfig';
import IsMoving from '../components/IsMoving';
import oneOf from '../utils/oneOf';
import {TILE_SIZE, DIRECTIONS} from '../gameConstants';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function aiSystem(systemArguments: ISystemArguments) {
  let entities = Entity.getByComps<BaseEntity>([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];

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
    entity.addComponent(new IsMoving());
  });
}

export default aiSystem;
