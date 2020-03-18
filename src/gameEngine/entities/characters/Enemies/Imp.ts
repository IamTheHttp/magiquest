import enemyAnimations from 'entities/animations/enemyAnimations';
import {ATTACK_SPEEDS_OPTIONS} from 'config';
import Enemy from "entities/characters/Enemies/Enemy";
import {AllowedLevelLocationIDs} from "gameConstants";

interface IImpConstructor {
  col: number;
  row: number;
  characterLevel: number;
  spawningTileLocationID: AllowedLevelLocationIDs
}

class Imp extends Enemy {
  constructor({col, row, characterLevel, spawningTileLocationID}: IImpConstructor) {
    let dmg = 20;
    let health = 100;
    let speed = 1;
    let vision = 200;
    let attackSpeed = ATTACK_SPEEDS_OPTIONS.FAST;
    let animationTypes = enemyAnimations;

    super({col, row, vision, speed, health, dmg, attackSpeed, animationTypes, characterLevel, spawningTileLocationID});
  }
}

export default Imp;