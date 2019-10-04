import {POSITION_COMP} from '../../ComponentNamesConfig';
// TODO all these 32 are magical, we need a config

export function moveDown(ent) {
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y + 32;
}

export default moveDown;