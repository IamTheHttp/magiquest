import enemyAnimations from '../../src/gameEngine/entities/animations/enemyAnimations';
import {AllowedZoneLocationIDs, ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES} from '../../src/gameEngine/gameConstants';
import Enemy from '../../src/gameEngine/entities/placeableEntities/Enemy';

function createNewEnemy(
  col: number,
  row: number,
  characterLevel: number,
  spawningTileLocationID: AllowedZoneLocationIDs
) {
  return new Enemy(
    {
      col,
      row,
      characterLevel,
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
      animationTypes: enemyAnimations
    }
  );
}

export default createNewEnemy;
