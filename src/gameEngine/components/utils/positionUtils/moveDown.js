import {POSITION} from '../../../constants';
// TODO all these 32 are magical, we need a config

export function moveDown(ent) {
  ent[POSITION].destX = ent[POSITION].x;
  ent[POSITION].destY = ent[POSITION].y + 32;
}

export default moveDown;