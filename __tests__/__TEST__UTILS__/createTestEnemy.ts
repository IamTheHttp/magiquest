import {createEnemyMoveAnimationDefinition} from '../../src/gameEngine/entities/animations/enemyAnimations';
import {AllowedZoneLocationIDs, ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES} from '../../src/gameEngine/gameConstants';
import Enemy from '../../src/gameEngine/entities/placeableEntities/Enemy';

function createNewEnemy(col: number, row: number, entityLevel: number, spawningTileLocationID: AllowedZoneLocationIDs) {
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
      radius: 16,
      speed: 2,
      attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
      displayName: 'test',
      id: PLACEABLE_ENTITIES.IMP,
      possibleAnimationsForEntity: createEnemyMoveAnimationDefinition(1) // arbitrary for tests
    }
  );
}

export default createNewEnemy;
