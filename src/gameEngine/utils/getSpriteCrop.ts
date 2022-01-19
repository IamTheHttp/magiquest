import {bit} from '../gameConstants';
import {ISprite} from '../interfaces';

function getSpriteCrop(col: number, row: number): ISprite {
  return {
    cropStartX: bit * col,
    cropStartY: bit * row,
    cropSizeX: bit,
    cropSizeY: bit
  };
}

export {getSpriteCrop};
