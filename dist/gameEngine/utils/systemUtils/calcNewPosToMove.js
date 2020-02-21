import { MOVEMENT_COMP } from '../../components/ComponentNamesConfig';
import assertType from '../assertType';
function calcNewPosToMove(entity, originX, originY, destX, destY) {
    assertType(originX, 'originX', 'number');
    assertType(originY, 'originY', 'number');
    assertType(destY, 'destY', 'number');
    assertType(destX, 'destX', 'number');
    var speed = entity[MOVEMENT_COMP].speed;
    var speedX = destX >= originX ? speed : speed * -1;
    var speedY = destY >= originY ? speed : speed * -1;
    var minMaxX = speedX > 0 ? Math.min : Math.max;
    var minMaxY = speedY > 0 ? Math.min : Math.max;
    return {
        x: minMaxX(originX + speedX, destX),
        y: minMaxY(originY + speedY, destY)
    };
}
export default calcNewPosToMove;
