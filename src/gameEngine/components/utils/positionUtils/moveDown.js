import {POSITION_COMP} from '../../ComponentNamesConfig';
import {bit} from '../../../config';
export function moveDown(ent) {
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y + bit;
}

export default moveDown;