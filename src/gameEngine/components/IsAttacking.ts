import {IS_ATTACKING_COMP} from './ComponentNamesConfig';
import IndexedTile from "../classes/IndexedTile";

class IsAttackingComp {
  name:string;
  targetTile:IndexedTile;
  currentFrame:number;


  constructor(targetTile: IndexedTile) {
    this.name = IS_ATTACKING_COMP;
    this.targetTile = targetTile;

    /**
     * @type {number}
     * @Desc An attack lasts a set amount of frames, specified in the attack_comp
     */
    this.currentFrame = 0;
  }
}

export default IsAttackingComp;
