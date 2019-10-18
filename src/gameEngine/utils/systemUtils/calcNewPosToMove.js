import {MOVEMENT_COMP} from '../../components/ComponentNamesConfig';
import assertType from '../assertType';

function calcNewPosToMove(entity, originX, originY, destX, destY) {
  assertType(originX, 'originX', 'number');
  assertType(originY, 'originY', 'number');
  assertType(destY, 'destY', 'number');
  assertType(destX, 'destX', 'number');

  let speed = entity[MOVEMENT_COMP].speed;
  let speedX = destX >= originX ? speed : speed * -1;
  let speedY = destY >= originY ? speed : speed * -1;
  
  let minMaxX = speedX > 0 ? Math.min : Math.max;
  let minMaxY = speedY > 0 ? Math.min : Math.max;
  
  return {
    x:minMaxX(originX + speedX, destX),
    y:minMaxY(originY + speedY, destY)
  };
}

export default calcNewPosToMove;