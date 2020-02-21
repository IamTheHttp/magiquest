import { PLAYER_CONTROLLED_COMP, POSITION_COMP } from 'gameEngine/components/ComponentNamesConfig';
import { getTileIdxByEnt } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import { DIRECTIONS } from 'gameEngine/gameConstants';
import IsAttackingComp from 'gameEngine/components/IsAttacking';
import GAME_PLATFORM from 'game-platform/dist';
var entityLoop = GAME_PLATFORM.entityLoop;
import { pushTrigger, Trigger } from 'gameEngine/systems/triggerSystem';
function performAction(systemArguments) {
    var tileIdxMap = systemArguments.tileIdxMap, Entity = systemArguments.Entity, levelArea = systemArguments.levelArea;
    var entity = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    var curOrientation = entity[POSITION_COMP].orientation;
    // tile to perform action on...
    var tileIdx = getTileIdxByEnt(entity);
    var col = +tileIdx.split('-')[0];
    var row = +tileIdx.split('-')[1];
    if (curOrientation === DIRECTIONS.LEFT) {
        col -= 1;
    }
    if (curOrientation === DIRECTIONS.RIGHT) {
        col += 1;
    }
    if (curOrientation === DIRECTIONS.UP) {
        row -= 1;
    }
    if (curOrientation === DIRECTIONS.DOWN) {
        row += 1;
    }
    var targetIdx = col + "-" + row;
    /**
     * @type {IndexedTile}
     */
    var targetTile = tileIdxMap[targetIdx];
    // ensure we're not out of bounds (and we target a real tile)
    if (targetTile) {
        var targetEntities = targetTile.entities;
        // For each target entity...
        entityLoop(targetEntities, 
        /** @param {BaseEntity} targetEnt */
        function (targetEnt) {
            // try to attack
            if (targetEnt.isAttackable() && targetTile && !entity.isAttacking()) {
                entity.addComponent(new IsAttackingComp(targetTile));
            }
            else {
                // try to activate a trigger
                var triggers = levelArea.triggers.actOnEntity[targetEnt.name] || [];
                // activate all triggers related to acting on this entity
                for (var i = 0; i < triggers.length; i++) {
                    var trigger = triggers[i];
                    if (trigger.type === 'dialog') {
                        pushTrigger(new Trigger({
                            type: 'dialog',
                            lines: trigger.lines,
                            actedOnEntity: targetEnt
                        }));
                    }
                }
            }
        });
    }
    else {
        return false;
    }
}
export default performAction;
