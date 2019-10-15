import {MOVEMENT_COMP} from '../../components/ComponentNamesConfig';
import assertType from '../assertType';

function calcNewPosToMove(entity, originX, originY, destX, destY) {
  assertType(originX, 'originX', 'number');
  assertType(originY, 'originY', 'number');
  assertType(destY, 'destY', 'number');
  assertType(destX, 'destX', 'number');
  
  let speed = entity[MOVEMENT_COMP].speed;
  
  // these two can't happen together, since we're moving by tile
  speed = destX >= originX ? speed : speed * -1;
  speed = destY >= originY ? speed : speed * -1;
  let minMax = speed > 0 ? Math.min : Math.max;
  
  return {
    x:minMax(originX + speed, destX),
    y:minMax(originY + speed, destY)
  };
}

export default calcNewPosToMove;