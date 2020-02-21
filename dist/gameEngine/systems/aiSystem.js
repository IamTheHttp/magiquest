import GAME_PLATFORM from 'game-platform/dist';
import { MOVEMENT_COMP, AI_CONTROLLED_COMP, POSITION_COMP, PLAYER_CONTROLLED_COMP } from '../components/ComponentNamesConfig';
import IsMoving from '../components/IsMoving';
import oneOf from '../utils/oneOf';
import { DIRECTIONS } from '../gameConstants';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import { bit } from 'gameEngine/config';
var Entity = GAME_PLATFORM.Entity, entityLoop = GAME_PLATFORM.entityLoop;
function aiSystem(systemArguments) {
    var entities = Entity.getByComps([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
    var player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    entityLoop(entities, function (entity) {
        if (entity.isMoving()) {
            return;
        }
        var visionRange = entity.getAIVisionRange();
        var chaseDirections = [];
        if (visionRange && player) {
            var _a = player.getPos(), playerX = _a.x, playerY = _a.y;
            var _b = entity.getPos(), x = _b.x, y = _b.y;
            var dist = Math.sqrt(Math.pow(playerX - x, 2) + Math.pow(playerY - y, 2));
            // chase
            /* istanbul ignore else */
            if (visionRange > dist) {
                // go towards the player!
                if (x < playerX) {
                    chaseDirections.push(DIRECTIONS.RIGHT);
                }
                if (x > playerX) {
                    chaseDirections.push(DIRECTIONS.LEFT);
                }
                if (y < playerY) {
                    chaseDirections.push(DIRECTIONS.DOWN);
                }
                if (y > playerY) {
                    chaseDirections.push(DIRECTIONS.UP);
                }
            }
            // attack if close
            var isNextToPlayer = false;
            if (x === playerX) {
                isNextToPlayer = Math.abs(playerY - y) === bit;
            }
            else if (y === playerY) {
                isNextToPlayer = Math.abs(playerX - x) === bit;
            }
            var isCurrentlyAttacking = entity.isAttacking();
            if (isNextToPlayer && !isCurrentlyAttacking) {
                var playerTileIdx = getTileIdxByEnt(player);
                var tileToAttack = systemArguments.tileIdxMap[playerTileIdx];
                entity.addComponent(new IsAttackingComp(tileToAttack));
            }
        }
        if (chaseDirections.length === 0) {
            chaseDirections = Object.keys(DIRECTIONS);
        }
        var dir = oneOf(chaseDirections);
        entity.setDestTo(dir);
        entity.addComponent(new IsMoving());
    });
}
export default aiSystem;
