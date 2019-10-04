import {POSITION_COMP} from '../../ComponentNamesConfig';
import {bit} from '../../../config';

export function moveLeft(ent) {
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x - bit;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y;
}

export default moveLeft;