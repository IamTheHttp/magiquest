import {SPRITE_SIZE} from '../gameConstants';

function getSpriteCrop(col: number, row: number) {
  return {
    cropStartX: SPRITE_SIZE * col,
    cropStartY: SPRITE_SIZE * row,
    cropSizeX: SPRITE_SIZE,
    cropSizeY: SPRITE_SIZE
  };
}

export {getSpriteCrop};
