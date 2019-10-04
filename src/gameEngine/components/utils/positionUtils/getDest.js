import {POSITION_COMP} from '../../ComponentNamesConfig';

function getDest(ent) {
  return {
    x:ent[POSITION_COMP].destX,
    y:ent[POSITION_COMP].destY
  };
}

export default getDest;