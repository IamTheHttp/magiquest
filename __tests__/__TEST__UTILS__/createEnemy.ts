import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";
import Character from "gameEngine/entities/characters/Character";
import {ATTACK_SPEEDS_OPTIONS} from "config";
import enemyAnimations from 'entities/animations/enemyAnimations';


function createNewEnemy(col: number, row: number, characterLevel: number, spawningTileLocationID: AllowedLevelLocationIDs) {
  return new Character({
    col,
    row,
    characterLevel,
    spawningTileLocationID
  }, {
    vision: 200,
    dmg: 10,
    health:20,
    radius: 16,
    speed: 2,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
    displayName: 'test',
    id: CHARACTERS.IMP,
    animationTypes: enemyAnimations
  });
};


export default createNewEnemy;