import {MOVEMENT} from '../../components/_ComponentNames';
import assertType from '../assertType';
import {BaseEntity} from '../../BaseEntity';

function calcNewPosToMove(entity: BaseEntity, originX: number, originY: number, destX: number, destY: number) {
  assertType(originX, 'originX', 'number');
  assertType(originY, 'originY', 'number');
  assertType(destY, 'destY', 'number');
  assertType(destX, 'destX', 'number');

  const speed = entity[MOVEMENT].speed;
  const speedX = destX >= originX ? speed : speed * -1;
  const speedY = destY >= originY ? speed : speed * -1;

  const minMaxX = speedX > 0 ? Math.min : Math.max;
  const minMaxY = speedY > 0 ? Math.min : Math.max;

  return {
    x: minMaxX(originX + speedX, destX),
    y: minMaxY(originY + speedY, destY)
  };
}

export default calcNewPosToMove;
