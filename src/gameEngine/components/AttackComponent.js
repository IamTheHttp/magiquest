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
  
    /**
     *
     * @type {IndexedTile}
     */
    this.targetForAnimation = null;
  
    /**
     *
     * @type {?number}
     */
    this.animationDuration = 20; // 20 frames? TODO this makes no sense to be here.. We need an animation class probably
    /**
     *
     * @type {number}
     */
    this.currentFrame = 0;
  }
}

export default AttackComponent;
