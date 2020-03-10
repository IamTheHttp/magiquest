import enemyAnimations from 'entities/animations/enemyAnimations';
import {ATTACK_SPEEDS_OPTIONS} from 'config';
import Enemy from "entities/characters/Enemies/Enemy";

interface IDemonConstructor {
  col: number;
  row: number;
  characterLevel: number;
}

class Gargoyle extends Enemy {
  constructor({col, row, characterLevel}: IDemonConstructor) {
    let dmg = 20;
    let health = 100;
    let speed = 4;
    let vision = 200;
    let attackSpeed = ATTACK_SPEEDS_OPTIONS.FAST;
    let animationTypes = enemyAnimations;

    super({col, row, vision, speed, health, dmg, attackSpeed, animationTypes, characterLevel});
  }
}

export default Gargoyle;