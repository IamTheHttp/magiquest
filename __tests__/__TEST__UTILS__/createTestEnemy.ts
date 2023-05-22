import {createEnemyMoveAnimationDefinition} from '../../src/gameEngine/entities/animations/enemyAnimations';
import {I_ALLOWED_ZONE_LOCATION_IDS, PLACEABLE_ENTITIES, TILE_SIZE} from '../../src/gameEngine/gameConstants';
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
      speed: 2,
      attackSpeed: 'FAST',
      displayName: 'test',
      id: PLACEABLE_ENTITIES.IMP,
      possibleAnimationsForEntity: createEnemyMoveAnimationDefinition(1) // arbitrary for tests
    }
  );
}

export default createNewEnemy;
