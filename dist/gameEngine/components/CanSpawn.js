import { CAN_SPAWN_COMP } from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
var CanSpawn = /** @class */ (function () {
    function CanSpawn(enemies) {
        if (enemies === void 0) { enemies = []; }
        this.name = CAN_SPAWN_COMP;
        enemies.forEach(function (enemyToSpawn) {
            assertType(enemyToSpawn.chance, 'Chance to spawn', 'number');
            assertType(enemyToSpawn.enemy, 'Type of enemy to spawn', 'string');
        });
        this.enemies = enemies;
    }
    return CanSpawn;
}());
export default CanSpawn;
