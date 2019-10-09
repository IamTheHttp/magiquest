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
  }
}

export default IsAttackingComp;
