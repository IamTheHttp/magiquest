import {SPAWNER} from '../components/_ComponentNames';
import {getGridIdxFromPos} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {entityLoop} from 'game-platform';
import Enemy from '../entities/placeableEntities/Enemy';
import {BaseEntity} from '../BaseEntity';

function spawnEnemiesSystem(systemArguments: ISystemArguments) {
  const {Entity, placeableEntityDataMap} = systemArguments;
  const spawningEntities = Entity.getByComps<BaseEntity>([SPAWNER]);
  const monsterDensity = systemArguments.zone.monsterDensity;

  entityLoop(spawningEntities, (spawningEntity) => {
    const {x, y} = spawningEntity.getPos(); // for example a tile that can spawn
    const {col, row} = getGridIdxFromPos(x, y);
    const spawningTileLocationID = spawningEntity[SPAWNER].tileLocationID;
    const entityLevel = spawningEntity[SPAWNER].tileEntityLevel;
    const spawnableEnemies = systemArguments.zone.spawnableEnemies;

    spawnableEnemies.forEach((enemyToSpawn) => {
      if (Math.random() < monsterDensity) {
        // TODO refactor to a function "rollDie" or "resolveChance"
        // Fetch what to spawn from config!
        const placeableEntityData = placeableEntityDataMap[enemyToSpawn];

        if (placeableEntityData) {
          new Enemy({col, row, entityLevel, spawningTileLocationID}, placeableEntityData);
          return;
        }
      }
    });
    spawningEntity.removeComponent(SPAWNER);
  });
}

export default spawnEnemiesSystem;
