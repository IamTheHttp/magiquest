import {POSITION_COMP} from 'ComponentNamesConfig';

function getPos(ent) {
  return {
    x:ent[POSITION_COMP].x,
    y:ent[POSITION_COMP].y
  };
}

export default getPos;