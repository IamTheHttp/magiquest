import {POSITION_COMP} from '../../ComponentNamesConfig';
import {bit} from '../../../config';

export function moveRight(ent) {
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x + bit;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y;
  ent[POSITION_COMP].originY = ent[POSITION_COMP].y;
  ent[POSITION_COMP].originX = ent[POSITION_COMP].x;
}

export default moveRight;