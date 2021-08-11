import {bit} from "../../../gameConstants";

function getCenterPosOfGridIdx(col:number, row:number) {
  return {
    x: col * bit + (bit / 2),
    y: row * bit + (bit / 2)
  };
}

function getGridIdxFromPos(x:number, y:number) {
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);

  return {col, row};
}

export {
  getCenterPosOfGridIdx,
  getGridIdxFromPos
};