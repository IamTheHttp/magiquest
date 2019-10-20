import {ANIMATIONS} from 'gameConstants';
import getSpriteCrop from 'utils/getSpriteCrop';

const bit = 32;



let grassTile = getSpriteCrop(0, 0);
let mountainTile = getSpriteCrop(6, 11);
let riverTiles = getSpriteCrop(5, 10);
let brownBrickDay = getSpriteCrop(17, 2);
let brownDoorDay = getSpriteCrop(15, 20);
let redRoofDay = getSpriteCrop(14, 10);
let monument = getSpriteCrop(22, 7);




const tileTypes = {
  0: mountainTile,
  1: grassTile,
  2: riverTiles,
  3: brownBrickDay,
  4: brownDoorDay,
  5: redRoofDay,
  6: monument
};

const animationTypes = {
  [ANIMATIONS.IDLE]: {
    frames: 60,
    animationName:ANIMATIONS.IDLE,
    size: 0.5, // in percent
    loops: true
  },
  [ANIMATIONS.BREATHING]: {
    frames: 15,
    animationName:ANIMATIONS.BREATHING,
    size: 0.5 // in percent
  }
};

const resolution = {
  width: 400,
  height: 240
};

export {
  bit,
  tileTypes,
  animationTypes,
  resolution
};
