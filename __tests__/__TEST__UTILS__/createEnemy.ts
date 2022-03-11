import enemyAnimations from '../../src/gameEngine/entities/animations/enemyAnimations';
import {AllowedZoneLocationIDs, ATTACK_SPEEDS_OPTIONS, CHARACTERS} from '../../src/gameEngine/gameConstants';
import Enemy from '../../src/gameEngine/entities/characters/Enemy';

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
      id: CHARACTERS.IMP,
      animationTypes: enemyAnimations
    }
  );
}

export default createNewEnemy;
