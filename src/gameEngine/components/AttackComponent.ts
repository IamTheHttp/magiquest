import {ATTACK_COMP} from './_ComponentNamesConfig';

class AttackComponent {
  name: string;
  damage: number;
  cooldownFrames: number;
  /**
   *
   * @param {number} damage
   */
  constructor(damage: number, cooldownFrames: number) {
    this.name = ATTACK_COMP;
    this.damage = damage;
    this.cooldownFrames = cooldownFrames;
  }
}

export default AttackComponent;
