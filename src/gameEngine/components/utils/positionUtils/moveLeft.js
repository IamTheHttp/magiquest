import {POSITION_COMP} from '../../ComponentNamesConfig';
// TODO all these 32 are magical, we need a config

export function moveLeft(ent) {
  ent[POSITION_COMP].destX = ent[POSITION_COMP].x - 32;
  ent[POSITION_COMP].destY = ent[POSITION_COMP].y;
}

export default moveLeft;