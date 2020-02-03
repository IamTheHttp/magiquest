import { IS_ATTACKING_COMP } from './ComponentNamesConfig';
var IsAttackingComp = /** @class */ (function () {
    /**
     * @param {IndexedTile} targetTile
     */
    function IsAttackingComp(targetTile) {
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
    return IsAttackingComp;
}());
export default IsAttackingComp;
