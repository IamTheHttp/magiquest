import {
  CAN_SPAWN_COMP
} from '../components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform/dist';
import Sentry from 'entities/Sentry';
import {CHARACTERS} from 'gameConstants';
import {getGridIdxFromPos} from 'utils/componentUtils/positionUtils/getCenterPosOfGridIdx';

let {entityLoop} = GAME_PLATFORM;


function spawnEnemiesSystem(systemArguments) {
  let {Entity} = systemArguments;
  let entities = Entity.getByComps([CAN_SPAWN_COMP]);

  entityLoop(entities, (entity) => {
    let {x, y} = entity.getPos(); // for example a tile that can spawn
    entity[CAN_SPAWN_COMP].enemies.forEach((enemyToSpawn) => {
      if (Math.random() < enemyToSpawn.chance) {
        if (enemyToSpawn.enemy === CHARACTERS.SENTRY) {
          let {col, row} = getGridIdxFromPos(x, y);
          new Sentry({col, row});
        }
      }
    });
    entity.removeComponent(CAN_SPAWN_COMP);
  });
}

export default spawnEnemiesSystem;