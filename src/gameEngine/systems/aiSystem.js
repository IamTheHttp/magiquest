import GAME_PLATFORM from 'game-platform/dist';
import {
  MOVEMENT_COMP,
  AI_CONTROLLED_COMP,
  POSITION_COMP,
  PLAYER_CONTROLLED_COMP
} from '../components/ComponentNamesConfig';
import IsMoving from '../components/IsMoving';
import oneOf from '../utils/oneOf';
import {DIRECTIONS} from '../gameConstants';
import {getTileIdxByEnt} from 'utils/componentUtils/tileUtils/getTileIdx';
import IsAttackingComp from 'components/IsAttacking';
import {bit} from 'config';

let {Entity, entityLoop} = GAME_PLATFORM;

function aiSystem(systemArguments) {
  let entities = Entity.getByComps([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
  let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];


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
        isNextToPlayer = Math.abs(playerY - y) === bit;
      } else if (y === playerY) {
        isNextToPlayer = Math.abs(playerX - x) === bit;
      }

      let isCurrentlyAttacking = entity.isAttacking();

      if (isNextToPlayer && !isCurrentlyAttacking) {
        let playerTileIdx = getTileIdxByEnt(player);

        let tileToAttack = systemArguments.tileIdxMap[playerTileIdx];
        entity.addComponent(new IsAttackingComp(tileToAttack));
      }
    }

    if (chaseDirections.length === 0) {
      chaseDirections = Object.keys(DIRECTIONS);
    }

    let dir = oneOf(chaseDirections);

    entity.setDestTo(dir);
    entity.addComponent(new IsMoving());
  });
}

export default aiSystem;