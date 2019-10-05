
import GAME_PLATFORM from 'game-platform/dist';
import {
} from 'gameEngine/constants';
import getPos from '../components/utils/positionUtils/getPos';
import getDest from '../components/utils/positionUtils/getDest';
import destReached from '../components/utils/positionUtils/destReached';
import isTraversable from '../components/utils/movementUtils/isTraversable';
import {MOVEMENT_COMP, MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from '../components/ComponentNamesConfig';
import {getTileIdxByPos} from '../components/utils/tileUtils/getTileIdx';
import calcNewPosToMove from './utils/calcNewPosToMove';
import centerCameraOnEntity from './utils/centerCameraOnEntity';
import getSafeDest from './utils/getSafeDest';
let {Entity, entityLoop} = GAME_PLATFORM;


function moveEntity(systemArguments, entity) {
  let {mapAPI, game, tileIdxMap} = systemArguments;
  let {mapHeight, mapWidth, viewHeight, viewWidth} = systemArguments.viewSize;
  let {x: currX, y: currY} = getPos(entity);
  
  // get adjusted destination, make sure you can't leave the map
  let {x: destX, y: destY} = getDest(entity);
  let {x: safeX, y: safeY} = getSafeDest(destX, destY, mapWidth, mapHeight);
  destX = entity[POSITION_COMP].destX = safeX;
  destY = entity[POSITION_COMP].destY = safeY;
  
  
  /**
   * Is our destination traversable? if not, we stop.
   */
  if (!isTraversable(tileIdxMap, destX, destY, entity)) {
    // stop the entity
    // updateMapTileIdx({entity, tileIdxMap, newX: currX, newY: currY, oldX: entity[POSITION_COMP].originX, oldY: entity[POSITION_COMP].originY});
    entity.removeComponent(MOVING_COMP);
    entity[POSITION_COMP].originX = null;
    entity[POSITION_COMP].originY = null;
    
    return;
  }
  
  // always occupy your destination first
  updateMapTileIdx({entity, tileIdxMap, newX: destX, newY: destY});
  
  /**
   * was our destination reached? if it was, we stop.
   */
  if (destReached(entity)) {
    // insert the entity as an occupant of the tile
    // since we're moving - make sure the entity leaves the origin tile
    // we need the original Y and X...
    updateMapTileIdx({entity, tileIdxMap, newX: destX, newY: destY, oldX: entity[POSITION_COMP].originX, oldY: entity[POSITION_COMP].originY});
    // stop the entity
    // TODO does originX belong in MOVING_COMP?
    entity.removeComponent(MOVING_COMP);
    entity[POSITION_COMP].originX = null;
    entity[POSITION_COMP].originY = null;
    return;
  }
  
  /**
   * Lets start moving...
   */
  let {x: newX, y: newY} = calcNewPosToMove(entity, currX, currY, destX, destY);
  
  // update position
  entity[POSITION_COMP].x = newX;
  entity[POSITION_COMP].y = newY;
  
  
  /**
   * Pan the camera around the player controlled entity
   */
  if (entity[PLAYER_CONTROLLED_COMP]) {
    centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight);
  }
}

function moveSystem(systemArguments, mapAPI) {
  let entities = Entity.getByComps([MOVEMENT_COMP, POSITION_COMP, MOVING_COMP]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      moveEntity(systemArguments, entity, mapAPI);
    });
  }
}

export default moveSystem;


function updateMapTileIdx({entity, tileIdxMap,  oldX, oldY, newX, newY}) {
  let oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
  let newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];
  
  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export {updateMapTileIdx};