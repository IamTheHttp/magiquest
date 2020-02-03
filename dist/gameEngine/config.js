import getSpriteCrop from 'gameEngine/utils/getSpriteCrop';
var bit = 32;
var grassTile = getSpriteCrop(0, 0);
var mountainTile = getSpriteCrop(6, 11);
var riverTiles = getSpriteCrop(5, 10);
var brownBrickDay = getSpriteCrop(17, 2);
var brownDoorDay = getSpriteCrop(15, 20);
var redRoofDay = getSpriteCrop(14, 10);
var monument = getSpriteCrop(22, 7);
var dirtPath = getSpriteCrop(2, 0);
var treeGrassTile = getSpriteCrop(0, 1);
var treeGrassTileGreen = getSpriteCrop(5, 19);
var treeGrassTilePine = getSpriteCrop(9, 19);
var sand = getSpriteCrop(9, 10);
var sea = getSpriteCrop(6, 10);
var tileTypes = {
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
var attackSpeeds = {
    SLOW: 90,
    FAST: 70,
    FASTER: 60,
    FASTEST: 45
};
var resolution = {
    width: 400 * 2,
    height: 240 * 2
};
var ATTACK_CONFIG = {
    lineWidth: 3
};
export { ATTACK_CONFIG, bit, tileTypes, resolution, attackSpeeds };
