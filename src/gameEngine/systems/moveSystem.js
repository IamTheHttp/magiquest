
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
  let {x: originX, y: originY} = getPos(entity);
  
  // get adjusted destination, make sure you can't leave the map
  let {x: destX, y: destY} = getDest(entity);
  let {x: safeX, y: safeY} = getSafeDest(destX, destY, mapWidth, mapHeight);
  destX = entity[POSITION_COMP].destX = safeX;
  destY = entity[POSITION_COMP].destY = safeY;
  
  /**
   * Is our destination traversable? if not, we stop.
   */
  if (!isTraversable(tileIdxMap, destX, destY)) {
    // stop the entity
    entity.removeComponent(MOVING_COMP);
    return;
  }
  
  /**
   * was our destination reached? if it was, we stop.
   */
  if (destReached(entity)) {
    // insert the entity as an occupant of the tile
    updateMapTileIdx({entity, tileIdxMap, newX: destX, newY: destY});
    // stop the entity
    entity.removeComponent(MOVING_COMP);
    return;
  }
  
  /**
   * Lets start moving...
   */
  
  // since we're moving - make sure the entity leaves the origin tile
  updateMapTileIdx({entity, tileIdxMap, oldX: originX, oldY: originY});
  
  let {x: newX, y: newY} = calcNewPosToMove(entity, originX, originY, destX, destY);
  
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
  console.log(newIndexedTile);
}

export {updateMapTileIdx};