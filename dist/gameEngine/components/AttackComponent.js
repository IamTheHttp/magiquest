import { ATTACK_COMP } from './ComponentNamesConfig';
var AttackComponent = /** @class */ (function () {
    /**
     *
     * @param {number} damage
     */
    function AttackComponent(damage, cooldownFrames) {
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
    return AttackComponent;
}());
export default AttackComponent;
