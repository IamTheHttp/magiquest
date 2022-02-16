import {TILE_SIZE} from '../../../gameConstants';

function getCenterPosOfGridIdx(col: number, row: number) {
  return {
    x: col * TILE_SIZE + TILE_SIZE / 2,
    y: row * TILE_SIZE + TILE_SIZE / 2
  };
}

function getGridIdxFromPos(x: number, y: number) {
  let col = Math.floor(x / TILE_SIZE);
  let row = Math.floor(y / TILE_SIZE);

  return {col, row};
}

export {getCenterPosOfGridIdx, getGridIdxFromPos};
