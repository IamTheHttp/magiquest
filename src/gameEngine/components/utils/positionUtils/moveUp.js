import {POSITION_COMP} from '../../ComponentNamesConfig';
import {bit} from '../../../config';

function moveUp(ent) {
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y - bit;
}

export default moveUp;