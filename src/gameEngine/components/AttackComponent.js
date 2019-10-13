import {ATTACK_COMP} from './ComponentNamesConfig';

class AttackComponent {
  /**
   *
   * @param {number} damage
   */
  constructor(damage) {
    /**
     * @type {string}
     */
    this.name = ATTACK_COMP;
  
    /**
     * @type {number}
     */
    this.damage = damage;
  }
}

export default AttackComponent;
