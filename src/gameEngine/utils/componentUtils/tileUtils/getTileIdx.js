import getPos from '../positionUtils/getPos';
import {bit} from '../../../config';

function getTileIdxByPos(x, y) {
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);
  
  return `${row}-${col}`;
}

function getTileIdxByEnt(ent) {
  let {x, y} = getPos(ent);
  
  return getTileIdxByPos(x, y);
}



export {
  getTileIdxByEnt,
  getTileIdxByPos
};
