import {BaseEntity} from "../../../BaseEntity";
import {bit} from "../../../gameConstants";

function getTileIdxByPos(x:number, y:number) {
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);

  return `${col},${row}`; // TODO move to util to abstract the comma
}

function getTileIdxByEnt(entity: BaseEntity) {
  let {x, y} = entity.getPos();

  return getTileIdxByPos(x, y);
}


export {
  getTileIdxByEnt,
  getTileIdxByPos
};
