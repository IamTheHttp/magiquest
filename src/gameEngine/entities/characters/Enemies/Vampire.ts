import enemyAnimations from 'entities/animations/enemyAnimations';
import {ATTACK_SPEEDS_OPTIONS} from 'config';
import Enemy from "entities/characters/Enemies/Enemy";
import {AllowedLevelLocationIDs} from "gameConstants";

interface IVampireConstructor {
  col: number;
  row: number;
  characterLevel: number;
  spawningTileLocationID: AllowedLevelLocationIDs
}

class Vampire extends Enemy {
  constructor({col, row, characterLevel,spawningTileLocationID}: IVampireConstructor) {
    let dmg = 5;
    let health = 100;
    let speed = 2;
    let vision = 200;
    let attackSpeed = ATTACK_SPEEDS_OPTIONS.FAST;
    let animationTypes = enemyAnimations;

    super({col, row, vision, speed, health, dmg, attackSpeed, animationTypes, characterLevel, spawningTileLocationID});
  }
}

export default Vampire;