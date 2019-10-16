import {ANIMATIONS} from 'gameConstants';

const bit = 32;


function getSprite(col, row) {
  return {
    cropStartX: bit * col,
    cropStartY: bit * row,
    cropSizeX: bit,
    cropSizeY: bit
  };
}

// TODO utility crops, move to somewhere useful
let grassTile = getSprite(0, 0);
let mountainTile = getSprite(6, 11);
let riverTiles = getSprite(5, 10);
let brownBrickDay = getSprite(17, 2);
let brownDoorDay = getSprite(15, 20);
let redRoofDay = getSprite(14, 10);
let monument = getSprite(22, 7);




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

export {
  bit,
  tileTypes,
  animationTypes
};
