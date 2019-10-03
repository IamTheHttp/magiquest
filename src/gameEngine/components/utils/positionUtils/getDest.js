import {POSITION} from '../../../constants';

function getDest(ent) {
  return {
    x:ent[POSITION].destX,
    y:ent[POSITION].destY
  };
}

export default getDest;