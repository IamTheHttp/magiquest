import {ATTACKER} from './_ComponentNames';

class Attacker {
  name: string;
  damage: number;
  cooldownFrames: number;
  /**
   *
   * @param {number} damage
   */
  constructor(damage: number, cooldownFrames: number) {
    this.name = ATTACKER;
    this.damage = damage;
    this.cooldownFrames = cooldownFrames;
  }
}

export default Attacker;
