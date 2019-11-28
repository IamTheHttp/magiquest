import {bit} from 'config';

function getCenterPosOfGridIdx(col, row) {
  return {
    x: col * bit + (bit / 2),
    y: row * bit + (bit / 2)
  };
}

function getGridIdxFromPos(x, y) {
  let col = Math.floor(x / bit);
  let row = Math.floor(y / bit);

  return {col, row};
}

export {
  getCenterPosOfGridIdx,
  getGridIdxFromPos
};