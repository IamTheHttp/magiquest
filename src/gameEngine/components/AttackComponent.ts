import {ATTACK_COMP} from './ComponentNamesConfig';

class AttackComponent {
  name: string;
  damage:number;
  cooldownFrames: number;
  /**
   *
   * @param {number} damage
   */
  constructor(damage, cooldownFrames) {
    /**
     * @type {string}
     */
    this.name = ATTACK_COMP;
  
    /**
     * @type {number}
     */
    this.damage = damage;

    /**
     * @type {number}
     * @desc dictates the cooldown of the atack
     */
    this.cooldownFrames = cooldownFrames;
  }
}

export default AttackComponent;
