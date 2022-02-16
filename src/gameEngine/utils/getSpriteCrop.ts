import {TILE_SIZE} from '../gameConstants';
import {ISprite} from '../../interfaces/IGeneral';

function getSpriteCrop(col: number, row: number): ISprite {
  return {
    cropStartX: TILE_SIZE * col,
    cropStartY: TILE_SIZE * row,
    cropSizeX: TILE_SIZE,
    cropSizeY: TILE_SIZE
  };
}

export {getSpriteCrop};
