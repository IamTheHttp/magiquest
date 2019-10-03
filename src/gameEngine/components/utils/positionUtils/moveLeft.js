import {POSITION} from '../../../constants';
// TODO all these 32 are magical, we need a config

export function moveLeft(ent) {
  ent[POSITION].destX = ent[POSITION].x - 32;
  ent[POSITION].destY = ent[POSITION].y;
}

export default moveLeft;