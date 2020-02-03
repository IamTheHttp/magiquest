import { CAN_SPAWN_COMP } from '../components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform/dist';
import Sentry from 'gameEngine/entities/Sentry';
import { CHARACTERS } from 'gameEngine/gameConstants';
import { getGridIdxFromPos } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
var entityLoop = GAME_PLATFORM.entityLoop;
function spawnEnemiesSystem(systemArguments) {
    var Entity = systemArguments.Entity;
    var entities = Entity.getByComps([CAN_SPAWN_COMP]);
    entityLoop(entities, function (entity) {
        var _a = entity.getPos(), x = _a.x, y = _a.y; // for example a tile that can spawn
        entity[CAN_SPAWN_COMP].enemies.forEach(function (enemyToSpawn) {
            if (Math.random() < enemyToSpawn.chance) {
                if (enemyToSpawn.enemy === CHARACTERS.SENTRY) {
                    var _a = getGridIdxFromPos(x, y), col = _a.col, row = _a.row;
                    new Sentry({ col: col, row: row });
                }
            }
        });
        entity.removeComponent(CAN_SPAWN_COMP);
    });
}
export default spawnEnemiesSystem;
