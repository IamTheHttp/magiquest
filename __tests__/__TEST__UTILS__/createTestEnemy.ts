import {createEnemyMoveAnimationDefinition} from '../../src/gameEngine/entities/animations/enemyAnimations';
import {I_ALLOWED_ZONE_LOCATION_IDS, TILE_SIZE} from '../../src/gameEngine/gameConstants';
import Enemy from '../../src/gameEngine/entities/placeableEntities/Enemy';

function createNewEnemy(
  col: number,
  row: number,
  entityLevel: number,
  spawningTileLocationID: I_ALLOWED_ZONE_LOCATION_IDS
) {
  return new Enemy(
    {
      col,
      row,
      entityLevel,
      spawningTileLocationID
    },
    {
      vision: 200,
      dmg: 10,
      health: 20,
      radius: TILE_SIZE / 2,
      speedTilesPerSecond: 2,
      attackSpeed: 'FAST',
      displayName: 'test',
      id: 'IMP',
      possibleAnimationsForEntity: createEnemyMoveAnimationDefinition(1) // arbitrary for tests
    }
  );
}

export default createNewEnemy;
