import {POSITION} from '../../../constants';

function getPos(ent) {
  return {
    x:ent[POSITION].x,
    y:ent[POSITION].y
  };
}

export default getPos;