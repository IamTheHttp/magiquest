import {CAN_SPAWN_COMP} from '../components/ComponentNamesConfig';
import {getGridIdxFromPos} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {entityLoop} from 'game-platform';
import Enemy from '../entities/placeableEntities/Enemy';
import {BaseEntity} from '../BaseEntity';

function spawnEnemiesSystem(systemArguments: ISystemArguments) {
  let {Entity, placeableEntityDataMap} = systemArguments;
  let spawningEntities = Entity.getByComps<BaseEntity>([CAN_SPAWN_COMP]);
  const monsterDensity = systemArguments.zone.monsterDensity;

  entityLoop(spawningEntities, (spawningEntity) => {
    const {x, y} = spawningEntity.getPos(); // for example a tile that can spawn
    const {col, row} = getGridIdxFromPos(x, y);
    const spawningTileLocationID = spawningEntity[CAN_SPAWN_COMP].tileLocationID;
    const entityLevel = spawningEntity[CAN_SPAWN_COMP].tileEntityLevel;
    const spawnableEnemies = systemArguments.zone.spawnableEnemies;

    spawnableEnemies.forEach((enemyToSpawn) => {
      if (Math.random() < monsterDensity) {
        // TODO refactor to a function "rollDie" or "resolveChance"
        // Fetch what to spawn from config!
        let placeableEntityConfig = placeableEntityDataMap[enemyToSpawn];

        if (placeableEntityConfig) {
          new Enemy({col, row, entityLevel, spawningTileLocationID}, placeableEntityConfig);
          return;
        }
      }
    });
    spawningEntity.removeComponent(CAN_SPAWN_COMP);
  });
}

export default spawnEnemiesSystem;
