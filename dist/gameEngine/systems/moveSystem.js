import GAME_PLATFORM from 'game-platform/dist';
import { MOVEMENT_COMP, IS_MOVING_COMP, POSITION_COMP } from 'gameEngine/components/ComponentNamesConfig';
import getSafeDest from '../utils/systemUtils/getSafeDest';
import isTraversable from '../utils/componentUtils/movementUtils/isTraversable';
import updateMapTileIdx from '../utils/systemUtils/move/updateMapTileIdx';
import calcNewPosToMove from '../utils/systemUtils/calcNewPosToMove';
import centerCameraOnEntity from '../utils/systemUtils/centerCameraOnEntity';
import isNum from 'gameEngine/utils/isNum';
import assertType from 'gameEngine/utils/assertType';
import { getGridIdxFromPos } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import { getTileIdxByPos } from 'gameEngine/utils/componentUtils/tileUtils/getTileIdx';
import { Trigger, pushTrigger } from 'gameEngine/systems/triggerSystem';
var Entity = GAME_PLATFORM.Entity, entityLoop = GAME_PLATFORM.entityLoop;
/**
 *
 * @param systemArguments
 * @param {BaseEntity} entity
 */
function moveEntity(systemArguments, entity) {
    var mapAPI = systemArguments.mapAPI, game = systemArguments.game, tileIdxMap = systemArguments.tileIdxMap, viewSize = systemArguments.viewSize, levelArea = systemArguments.levelArea;
    var mapHeight = viewSize.mapHeight, mapWidth = viewSize.mapWidth, viewHeight = viewSize.viewHeight, viewWidth = viewSize.viewWidth;
    var _a = entity.getPos(), currX = _a.x, currY = _a.y;
    var _b = entity.getDest(), desiredDestX = _b.x, desiredDestY = _b.y;
    var dir = entity.getMoveDirection();
    // the user has a desired place he wants to go..
    var modDestX = desiredDestX;
    var modDestY = desiredDestY;
    // Set the modified, safe destination for the user
    if (isNum(desiredDestX) && isNum(desiredDestY)) {
        // make sure the that the desired destination is valid, and doesn't leave the map
        var _c = getSafeDest(desiredDestX, desiredDestY, mapWidth, mapHeight), x = _c.x, y = _c.y;
        modDestY = y;
        modDestX = x;
    }
    else if (dir) {
        // create destination from the direction we want to go
        var _d = entity.getDestFromDirection(dir), x = _d.x, y = _d.y;
        modDestY = y;
        modDestX = x;
    }
    else {
        // no direction, no destination? too bad, stop.
        entity.stop();
        return;
    }
    entity.setOrientation(entity.calcOrientation(modDestX, modDestY));
    var animationName = "MOVE_" + entity.getOrientation();
    var animationToAdd = entity.getAnimationTypes()[animationName];
    // Only add this animation if we don't have it already
    if (animationToAdd && !entity.hasSpecificAnimation(animationName)) {
        entity.clearAllAnimations();
        entity.addAnimation(entity.getAnimationTypes()[animationName]);
    }
    // set destination
    entity.setDest({
        x: modDestX,
        y: modDestY
    });
    /**
     * Stopping Point - Was our destination reached? if it was, we stop.
     */
    if (entity.isDestReached()) {
        // insert the entity as an occupant of the tile
        // since we're moving - make sure the entity leaves the origin tile
        updateMapTileIdx({
            entity: entity,
            tileIdxMap: tileIdxMap,
            newX: entity.getDest().x,
            newY: entity.getDest().y,
            oldX: entity[POSITION_COMP].originX,
            oldY: entity[POSITION_COMP].originY
        });
        // if entity has a direction it wants to go, lets stop it, and reset its movement in the direction
        entity.stop();
        var _e = entity.getPos(), x = _e.x, y = _e.y;
        assertType((x + 16) % 32 === 0, "Entities should be on the grid " + x + " " + y, true);
        assertType((y + 16) % 32 === 0, 'gameEngine/entities should be on the grid', true);
        if (dir) {
            entity.setMoveDirection(dir);
        }
        /**
         * Execute possible triggers when movement is done
         */
        var _f = getGridIdxFromPos(x, y), col = _f.col, row = _f.row;
        var tileIdx = getTileIdxByPos(x, y);
        if (levelArea.triggers.move[tileIdx]) {
            var trigger = levelArea.triggers.move[tileIdx];
            pushTrigger(new Trigger({
                type: 'dialog',
                lines: trigger.lines
            }));
        }
        ;
        return;
    }
    /**
     * Stopping Point - Is our (modified) destination traversable? if not, we stop.
     */
    if (!isTraversable(tileIdxMap, modDestX, modDestY, entity)) {
        entity.stop();
        return;
    }
    /**
     * Prep before we move, occupy the target tile
     */
    updateMapTileIdx({ entity: entity, tileIdxMap: tileIdxMap, newX: entity.getDest().x, newY: entity.getDest().y });
    /**
     * Calc the new X,Y to move to
     */
    var _g = calcNewPosToMove(entity, currX, currY, entity.getDest().x, entity.getDest().y), newX = _g.x, newY = _g.y;
    /**
     * Update, at the end of the tick, the indexMap
     *
     * Do not free your tile until the end of the tick
     * If you release it too soon, this situation occures;
     * player -> going from 0 to 1
     * enemy -> going from 1 to 0
     * since at the moment of 'going' the tile is already free, the entities pass through each other
     * by waiting for the next tick(or the end of this one), we guarantee that for the duration of THIS tick
     * both destination and origin are occupied
     */
    Promise.resolve().then(function () {
        updateMapTileIdx({ entity: entity, tileIdxMap: tileIdxMap, oldX: currX, oldY: currY });
    });
    entity.setPos({
        x: newX,
        y: newY
    });
    /**
     * Pan the camera around the player controlled entity
     */
    /* istanbul ignore else */
    if (entity.isPlayer()) {
        centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight);
    }
}
function moveSystem(systemArguments) {
    var entities = Entity.getByComps([MOVEMENT_COMP, POSITION_COMP, IS_MOVING_COMP]);
    if (entities.length) {
        entityLoop(entities, function (entity) {
            moveEntity(systemArguments, entity);
        });
    }
}
export default moveSystem;
