import {bit} from 'gameEngine/config';

export interface ISprite {
  cropStartX:number;
  cropStartY: number;
  cropSizeX:number
  cropSizeY:number;
}

function getSpriteCrop(col: number, row: number): ISprite {
  return {
    cropStartX: bit * col,
    cropStartY: bit * row,
    cropSizeX: bit,
    cropSizeY: bit
  };
}


export default getSpriteCrop;