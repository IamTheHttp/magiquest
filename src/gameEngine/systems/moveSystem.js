import GAME_PLATFORM from 'game-platform/dist';
import {
  ANIMATIONS
} from 'gameEngine/constants';
import {MOVEMENT_COMP, IS_MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from '../components/ComponentNamesConfig';
import getDest from '../utils/componentUtils/positionUtils/getDest';
import getSafeDest from '../utils/systemUtils/getSafeDest';
import isTraversable from '../utils/componentUtils/movementUtils/isTraversable';
import updateMapTileIdx from '../utils/systemUtils/move/updateMapTileIdx';
import destReached from '../utils/componentUtils/positionUtils/destReached';
import calcNewPosToMove from '../utils/systemUtils/calcNewPosToMove';
import centerCameraOnEntity from '../utils/systemUtils/centerCameraOnEntity';
import {animationTypes} from '../config';

let {Entity, entityLoop} = GAME_PLATFORM;

// TODO fix orientation

function isNum(num) {
  return typeof num === 'number';
}

/**
 *
 * @param systemArguments
 * @param {BaseEntity} entity
 */
function moveEntity(systemArguments, entity) {
  let {mapAPI, game, tileIdxMap} = systemArguments;
  let {mapHeight, mapWidth, viewHeight, viewWidth} = systemArguments.viewSize;
  let {x: currX, y: currY} = entity.getPos();
  let {x: desiredDestX, y : desiredDestY} = entity.getDest();
  let dir = entity.getMoveDirection();
  
  
  /**
   * Stopping Point - Was our destination reached? if it was, we stop.
   */
  if (destReached(entity)) {
    // insert the entity as an occupant of the tile
    // since we're moving - make sure the entity leaves the origin tile
    updateMapTileIdx({
      entity,
      tileIdxMap,
      newX: entity.getDest().x,
      newY: entity.getDest().y,
      oldX: entity[POSITION_COMP].originX,
      oldY: entity[POSITION_COMP].originY
    });
    
    // if entity has a direction it wants to go, lets stop it, and reset its movement in the direction
    entity.stop();
    if (dir) {
      entity.setMoveDirection(dir);
    }

    return;
  }
  
  // the user has a desired place he wants to go..
  let modDestX = desiredDestX;
  let modDestY = desiredDestY;
  
  // Set the modified, safe destination for the user
  if (isNum(desiredDestX) && isNum(desiredDestY)) {
    // make sure the that the desired destination is valid, and doesn't leave the map
    let {x, y} = getSafeDest(desiredDestX, desiredDestY, mapWidth, mapHeight);
    modDestY = y;
    modDestX = x;
  } else if (dir) {
    // create destination from the direction we want to go
    let {x, y} = entity.getDestFromDirection(dir);
    modDestY = y;
    modDestX = x;
  } else {
    // no direction, no destination? too bad, stop.
    entity.stop();
    return;
  }
  
  // Update the entity's dest for future loops
  entity.setDest({
    x: modDestX,
    y: modDestY
  });
  
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
  updateMapTileIdx({entity, tileIdxMap, newX: entity.getDest().x, newY: entity.getDest().y});
  
  /**
   * Calc the new X,Y to move to
   */
  let {x: newX, y: newY} = calcNewPosToMove(entity, currX, currY, entity.getDest().x, entity.getDest().y);
  
  /**
   * Update, at the end of the tick, the indexMap
   * If you update it too soon, what happens?
   * TODO - Check what happens here, this was written for a reason
   */
  Promise.resolve().then(() => {
    updateMapTileIdx({entity, tileIdxMap, oldX: currX, oldY: currY});
  });
  
  entity.setPos({
    x: newX,
    y: newY
  });
  
  /**
   * Pan the camera around the player controlled entity
   */
  if (entity[PLAYER_CONTROLLED_COMP]) {
    centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight);
  }
}

function moveSystem(systemArguments) {
  let entities = Entity.getByComps([MOVEMENT_COMP, POSITION_COMP, IS_MOVING_COMP]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      moveEntity(systemArguments, entity);
    });
  }
}

export default moveSystem;

// once dest is reached, we nullify dest
// if we have direction, we keep moving
// keep the IS_MOVING comp
// finish the loop, user hits a button, removing the direction
// finish the rAF loop
// go into the moveSystem again, assuming there's a direction...
// user has no direction or dest, BOOM.
// if no direction
// remove IS_MOVING comp, no more movement