import {IS_ATTACKING_COMP} from './ComponentNamesConfig';

class IsAttackingComp {
  /**
   * @param {IndexedTile} targetTile
   */
  constructor(targetTile) {
    this.name = IS_ATTACKING_COMP;
  
    /**
     * @type {IndexedTile}
     */
    this.targetTile = targetTile;

    /**
     * @type {number}
     * @Desc An attack lasts a set amount of frames, specified in the attack_comp
     */
    this.currentFrame = 0;
  }
}

export default IsAttackingComp;
