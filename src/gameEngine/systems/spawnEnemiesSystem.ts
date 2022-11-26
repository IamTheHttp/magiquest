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
    const characterLevel = spawningEntity[CAN_SPAWN_COMP].tileCharacterLevel;
    const spawnableEnemies = systemArguments.zone.spawnableEnemies;

    spawnableEnemies.forEach((enemyToSpawn) => {
      if (Math.random() < monsterDensity) {
        // TODO refactor to a function "rollDie" or "resolveChance"
        // Fetch what to spawn from config!
        let characterConfig = placeableEntityDataMap[enemyToSpawn];

        if (characterConfig) {
          new Enemy({col, row, characterLevel, spawningTileLocationID}, characterConfig);
          return;
        }
      }
    });
    spawningEntity.removeComponent(CAN_SPAWN_COMP);
  });
}

export default spawnEnemiesSystem;
