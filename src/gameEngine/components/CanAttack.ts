import {CAN_ATTACK} from './_ComponentNamesConfig';

class CanAttack {
  name: string;
  damage: number;
  cooldownFrames: number;
  /**
   *
   * @param {number} damage
   */
  constructor(damage: number, cooldownFrames: number) {
    this.name = CAN_ATTACK;
    this.damage = damage;
    this.cooldownFrames = cooldownFrames;
  }
}

export default CanAttack;
