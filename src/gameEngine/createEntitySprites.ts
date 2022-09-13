import {getSpriteCrop} from './utils/getSpriteCrop';
import {ITileTypes} from '../interfaces/IGeneral';

let grassTile = getSpriteCrop(7, 10);
let mountainTile = getSpriteCrop(7, 11);
let riverTiles = getSpriteCrop(5, 10);
let brownBrickDay = getSpriteCrop(17, 2);
let brownDoorDay = getSpriteCrop(15, 20);
let redRoofDay = getSpriteCrop(14, 10);
let monument = getSpriteCrop(22, 7);
let dirtPath = getSpriteCrop(2, 0);
let treeGrassTile = getSpriteCrop(1, 1);
let treeGrassTileGreen = getSpriteCrop(6, 19);
let treeGrassTilePine = getSpriteCrop(10, 19);
let sand = getSpriteCrop(9, 10);
let sea = getSpriteCrop(6, 10);
let rockGate = getSpriteCrop(0, 19);
let sandMountain = getSpriteCrop(12, 11);
let caveFloor = getSpriteCrop(22, 1);
let caveWall = getSpriteCrop(19, 1);

export const WALKABLE_TILE_TYPES = [1, 7, 100, 13, 11];
export const TILE_TYPES = {
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
  11: rockGate,
  12: sandMountain,
  13: caveFloor,
  14: caveWall,
  100: sand,
  1000: sea
} as ITileTypes;
