
import GAME_PLATFORM from 'game-platform/dist';
import {
  MOVEMENT_COMP,
  POSITION,
  MOVING
} from 'gameEngine/constants';
import getPos from '../components/utils/positionUtils/getPos';
import getDest from '../components/utils/positionUtils/getDest';
import destReached from '../components/utils/positionUtils/destReached';

let {Entity, entityLoop} = GAME_PLATFORM;

function moveEntity(entity) {
  if (destReached(entity)) {
    entity.removeComponent(MOVING);
    return;
  }

  let destX = getDest(entity).x;
  let destY = getDest(entity).y;

  if (destX && destY) {
    let curX = getPos(entity).x;
    let curY = getPos(entity).y;
    let speed = entity[MOVEMENT_COMP].speed;
    
    let newX = 0;
    let newY = 0;
    
    // if we go back
    if (destX > curX) {
      newX = Math.min(curX + speed, destX);
    } else {
      newX = Math.max(curX - speed, destX);
    }
  
    if (destY > curY) {
      newY = Math.min(curY + speed, destY);
    } else {
      newY = Math.max(curY - speed, destY);
    }
    
    entity[POSITION].x = newX;
    entity[POSITION].y = newY;
  }
}

function moveSystem(systemArguments) {
  let entities = Entity.getByComps([MOVEMENT_COMP, POSITION, MOVING]);
  if (entities.length) {
    entityLoop(entities, (entity) => {
      moveEntity(entity);
    });
  }
}

export default moveSystem;