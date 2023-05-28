import {MOVEMENT} from '../../components/_ComponentNames';
import assertType from '../assertType';
import {BaseEntity} from '../../BaseEntity';
import {TILE_SIZE} from '../../gameConstants';

function calcNewPosToMove(entity: BaseEntity, originX: number, originY: number, destX: number, destY: number) {
  assertType(originX, 'originX', 'number');
  assertType(originY, 'originY', 'number');
  assertType(destY, 'destY', 'number');
  assertType(destX, 'destX', 'number');

  const tilesPerSecond = entity[MOVEMENT].speedTilesPerSecond;
  const tilesPerTick = tilesPerSecond / 60;
  const pixelsToMove = tilesPerTick * TILE_SIZE;

  const speedX = destX >= originX ? pixelsToMove : pixelsToMove * -1;
  const speedY = destY >= originY ? pixelsToMove : pixelsToMove * -1;

  const minMaxX = speedX > 0 ? Math.min : Math.max;
  const minMaxY = speedY > 0 ? Math.min : Math.max;

  return {
    x: minMaxX(originX + speedX, destX),
    y: minMaxY(originY + speedY, destY)
  };
}

export default calcNewPosToMove;
