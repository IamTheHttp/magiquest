import getSpriteCrop from 'gameEngine/utils/getSpriteCrop';

let bit = 32;
let grassTile = getSpriteCrop(0, 0);
let mountainTile = getSpriteCrop(6, 11);
let riverTiles = getSpriteCrop(5, 10);
let brownBrickDay = getSpriteCrop(17, 2);
let brownDoorDay = getSpriteCrop(15, 20);
let redRoofDay = getSpriteCrop(14, 10);
let monument = getSpriteCrop(22, 7);
let dirtPath = getSpriteCrop(2, 0);
let treeGrassTile = getSpriteCrop(0, 1);
let treeGrassTileGreen = getSpriteCrop(5, 19);
let treeGrassTilePine = getSpriteCrop(9, 19);
let sand = getSpriteCrop(9, 10);
let sea = getSpriteCrop(6, 10);

let tileTypes = {
  0: mountainTile,
  1: grassTile,
  2: riverTiles,
  3: brownBrickDay,
  4: brownDoorDay,
  5: redRoofDay,
  6: monument,
  7: dirtPath,
  8: treeGrassTile,
  9: treeGrassTileGreen,
  10: treeGrassTilePine,
  100: sand,
  1000: sea
};

let attackSpeeds = {
  SLOW: 90,
  FAST: 70,
  FASTER: 60,
  FASTEST: 45
};

let resolution = {
  width: 400 * 2,
  height: 240 * 2
};

let ATTACK_CONFIG = {
  lineWidth: 3
};

export {
  ATTACK_CONFIG,
  bit,
  tileTypes,
  resolution,
  attackSpeeds
};