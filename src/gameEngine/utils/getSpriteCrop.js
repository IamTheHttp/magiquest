import {bit} from 'config';

function getSpriteCrop(col, row) {
  return {
    cropStartX: bit * col,
    cropStartY: bit * row,
    cropSizeX: bit,
    cropSizeY: bit
  };
}


export default getSpriteCrop;