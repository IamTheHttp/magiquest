import {bit} from '../../../config';
import BaseEntity from "BaseEntity";

function getTileIdxByPos(x:number, y:number) {
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);
  
  return `${col}-${row}`;
}

function getTileIdxByEnt(entity: BaseEntity) {
  let {x, y} = entity.getPos();
  
  return getTileIdxByPos(x, y);
}


export {
  getTileIdxByEnt,
  getTileIdxByPos
};
