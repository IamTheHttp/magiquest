
import GAME_PLATFORM from 'game-platform/dist';
import {
} from 'gameEngine/constants';
import getPos from '../components/utils/positionUtils/getPos';
import getDest from '../components/utils/positionUtils/getDest';
import destReached from '../components/utils/positionUtils/destReached';
import isTraversable from '../components/utils/movementUtils/isTraversable';
import {MOVEMENT_COMP, MOVING_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP} from '../components/ComponentNamesConfig';
let {Entity, entityLoop} = GAME_PLATFORM;



function moveEntity(systemArguments, entity) {
  let {mapAPI, game, tileIdx} = systemArguments;
  let {mapHeight, mapWidth, viewHeight, viewWidth} = systemArguments.viewSize;
  
  let destX = getDest(entity).x;
  let destY = getDest(entity).y;
  
  // is destX traversable?
  // ix destY traversable?
  
  if (!isTraversable(tileIdx, destX, destY)) {
    // DONE, stop moving.
    entity.removeComponent(MOVING_COMP);
    return;
  }
  
  if (destReached(entity)) {
    entity.removeComponent(MOVING_COMP);
    return;
  }
  
  let marginFromSides = 16;
  
  // 0 is minY and minX
  entity[POSITION_COMP].destX = Math.max(Math.min(destX, mapWidth - marginFromSides), 0, marginFromSides);
  entity[POSITION_COMP].destY = Math.max(Math.min(destY, mapHeight - marginFromSides), 0, marginFromSides);
  
  destX = getDest(entity).x;
  destY = getDest(entity).y;

  let curX = getPos(entity).x;
  let curY = getPos(entity).y;
  let speed = entity[MOVEMENT_COMP].speed;
  
  let newX = 0;
  let newY = 0;
  
  // right
  if (destX > curX) {
    newX = Math.min(curX + speed, destX);
  } else { // left
    newX = Math.max(curX - speed, destX);
  }
  // down
  if (destY > curY) {
    newY = Math.min(curY + speed, destY);
  } else { // up
    newY = Math.max(curY - speed, destY);
  }
  
  entity[POSITION_COMP].x = newX;
  entity[POSITION_COMP].y = newY;
  
  if (entity[PLAYER_CONTROLLED_COMP]) {
    let {x, y} = getPos(entity);
    let {panX, panY} = mapAPI.getPan();
    
    let panToX = x < viewWidth / 2 ?  panX : -x + viewWidth / 2;
    let panToY = y < viewHeight / 2 ?  panY : -y + viewHeight / 2;
    
    
    if (x + viewWidth / 2 > mapWidth) {
      panToX = panX;
    }
  
    if (y + viewHeight / 2 > mapHeight) {
      panToY = panY;
    }
    
    
    mapAPI.pan(panToX, panToY);
    game.requestBackgroundRender();
    // pan to user
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