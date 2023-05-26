import {MOVEMENT, CONTROLLED_BY_AI, POSITION, PLAYER_CONTROLLED} from '../components/_ComponentNames';
import Moving from '../components/Moving';
import oneOf from '../utils/oneOf';
import {TILE_SIZE} from '../gameConstants';
import {getTileIdxByEnt} from 'gameEngine/utils/componentUtils/tileUtils/tileIdxUtils';
import IsAttackingComp from 'gameEngine/components/Attacking';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity, entityLoop} from 'game-platform';
import {BaseEntity} from '../BaseEntity';

function aiSystem(systemArguments: ISystemArguments) {
  const entities = Entity.getByComps<BaseEntity>([CONTROLLED_BY_AI, MOVEMENT, POSITION]);
  const player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

  entityLoop(entities, (entity) => {
    if (entity.isMoving()) {
      return;
    }

    const visionRange = entity.getAIVisionRange();
    let chaseDirections = [];

    if (visionRange && player) {
      const {x: playerX, y: playerY} = player.getPos();
      const {x, y} = entity.getPos();
      const dist = Math.sqrt(Math.pow(playerX - x, 2) + Math.pow(playerY - y, 2));

      // chase
      /* istanbul ignore else */
      if (visionRange > dist) {
        // go towards the player!
        if (x < playerX) {
          chaseDirections.push('RIGHT');
        }

        if (x > playerX) {
          chaseDirections.push('LEFT');
        }

        if (y < playerY) {
          chaseDirections.push('DOWN');
        }

        if (y > playerY) {
          chaseDirections.push('UP');
        }
      }

      // attack if close
      let isNextToPlayer = false;

      if (x === playerX) {
        isNextToPlayer = Math.abs(playerY - y) === TILE_SIZE;
      } else if (y === playerY) {
        isNextToPlayer = Math.abs(playerX - x) === TILE_SIZE;
      }

      const isCurrentlyAttacking = entity.isAttacking();

      if (isNextToPlayer && !isCurrentlyAttacking) {
        const playerTileIdx = getTileIdxByEnt(player);

        const tileToAttack = systemArguments.indexedTileMap[playerTileIdx];
        entity.addComponent(new IsAttackingComp(tileToAttack));
      }
    }

    if (chaseDirections.length === 0) {
      // TODO - Could we implement break this list dynamically instead of listing it all?
      chaseDirections = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    }

    const dir = oneOf(chaseDirections);

    entity.setDestTo(dir);
    entity.addComponent(new Moving());
  });
}

export default aiSystem;
