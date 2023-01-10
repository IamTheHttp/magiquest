import {TILE_SIZE} from '../gameConstants';

function getSpriteCrop(col: number, row: number) {
  return {
    cropStartX: TILE_SIZE * col,
    cropStartY: TILE_SIZE * row,
    cropSizeX: TILE_SIZE,
    cropSizeY: TILE_SIZE
  };
}

export {getSpriteCrop};
