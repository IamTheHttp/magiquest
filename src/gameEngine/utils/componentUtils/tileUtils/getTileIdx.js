import {bit} from '../../../config';

function getTileIdxByPos(x, y) {
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);
  
  return `${col}-${row}`;
}

function getTileIdxByEnt(ent) {
  let {x, y} = ent.getPos();
  
  return getTileIdxByPos(x, y);
}



export {
  getTileIdxByEnt,
  getTileIdxByPos
};
