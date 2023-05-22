import PLAYER_SPRITE_URL from '../assets/player.png';
import ITEMS_SPRITE_URL from '../assets/misc.png';
import TILESET_SPRITE_URL from '../assets/tileSet.png';

import {assetLoader} from '../utils/assetLoader';
import {getSpriteCrop} from './utils/getSpriteCrop';

/**
 * A function to get all the sprites in the game,
 * A sprite has a key which is a name
 * A sprite contains these pieces
 *   cropStartX: number;
 *   cropStartY: number;
 *   cropSizeX: number;
 *   cropSizeY: number;
 *   image: HTMLImage
 *
 *   This function should ONLY be called in the various renderSystems
 *   TODO this should be memoized
 */
export function getSprites() {
  return {
    GENERIC_ITEM: {
      image: assetLoader.getAsset(ITEMS_SPRITE_URL),
      ...getSpriteCrop(1, 4)
    },
    CHEST_SPRITE: {
      image: assetLoader.getAsset(ITEMS_SPRITE_URL),
      ...getSpriteCrop(1, 0)
    },
    ENTITY_PLAYER_UP: {
      image: assetLoader.getAsset(PLAYER_SPRITE_URL),
      ...getSpriteCrop(1, 3)
    },
    ENTITY_PLAYER_RIGHT: {
      image: assetLoader.getAsset(PLAYER_SPRITE_URL),
      ...getSpriteCrop(1, 0)
    },
    ENTITY_PLAYER_DOWN: {
      image: assetLoader.getAsset(PLAYER_SPRITE_URL),
      ...getSpriteCrop(1, 2)
    },
    ENTITY_PLAYER_LEFT: {
      image: assetLoader.getAsset(PLAYER_SPRITE_URL),
      ...getSpriteCrop(1, 1)
    },
    TILE_GRASS: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(0, 0)
    },
    TILE_TREE_GRASS: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(0, 1)
    },
    TILE_TREE_GRASS_GREEN: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(5, 19)
    },
    TILE_TREE_GRASS_PINE: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(9, 19)
    },
    TILE_MOUNTAIN: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(6, 11)
    },
    TILE_RIVER: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(5, 10)
    },
    TILE_BROWN_BRICK_DAY: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(17, 2)
    },
    TILE_BROWN_DOOR_DAY: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(15, 20)
    },
    TILE_RED_ROOF_DAY: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(14, 10)
    },
    TILE_MONUMENT: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(22, 7)
    },
    TILE_DIRT_PATH: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(2, 0)
    },
    TILE_SAND: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(9, 10)
    },
    TILE_SEA: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(6, 10)
    },
    TILE_ROCK_GATE: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(0, 19)
    },
    TILE_SAND_MOUNTAIN: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(12, 11)
    },
    TILE_CAVE_FLOOR: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(22, 1)
    },
    TILE_CAVE_WALL: {
      image: assetLoader.getAsset(TILESET_SPRITE_URL),
      ...getSpriteCrop(19, 1)
    }
  };
}

export function mapTileNameToTileType(str: keyof ReturnType<typeof getSprites>) {
  if (str === 'TILE_MOUNTAIN') {
    return 0;
  }
  if (str === 'TILE_GRASS') {
    return 1;
  }
  if (str === 'TILE_RIVER') {
    return 2;
  }
  if (str === 'TILE_BROWN_BRICK_DAY') {
    return 3;
  }
  if (str === 'TILE_BROWN_DOOR_DAY') {
    return 4;
  }
  if (str === 'TILE_RED_ROOF_DAY') {
    return 5;
  }
  if (str === 'TILE_MONUMENT') {
    return 6;
  }
  if (str === 'TILE_DIRT_PATH') {
    return 7;
  }
  if (str === 'TILE_TREE_GRASS') {
    return 8;
  }
  if (str === 'TILE_TREE_GRASS_GREEN') {
    return 9;
  }
  if (str === 'TILE_TREE_GRASS_PINE') {
    return 10;
  }
  if (str === 'TILE_ROCK_GATE') {
    return 11;
  }
  if (str === 'TILE_SAND_MOUNTAIN') {
    return 12;
  }
  if (str === 'TILE_CAVE_FLOOR') {
    return 13;
  }
  if (str === 'TILE_CAVE_WALL') {
    return 14;
  }
  if (str === 'TILE_SAND') {
    return 100;
  }
  if (str === 'TILE_SEA') {
    return 1000;
  }
}

export function mapTileTypeToSprite(num: number, SPRITES: ReturnType<typeof getSprites>) {
  if (num === 0) {
    return SPRITES.TILE_MOUNTAIN;
  }
  if (num === 1) {
    return SPRITES.TILE_GRASS;
  }
  if (num === 2) {
    return SPRITES.TILE_RIVER;
  }
  if (num === 3) {
    return SPRITES.TILE_BROWN_BRICK_DAY;
  }
  if (num === 4) {
    return SPRITES.TILE_BROWN_DOOR_DAY;
  }
  if (num === 5) {
    return SPRITES.TILE_RED_ROOF_DAY;
  }
  if (num === 6) {
    return SPRITES.TILE_MONUMENT;
  }
  if (num === 7) {
    return SPRITES.TILE_DIRT_PATH;
  }
  if (num === 8) {
    return SPRITES.TILE_TREE_GRASS;
  }
  if (num === 9) {
    return SPRITES.TILE_TREE_GRASS_GREEN;
  }
  if (num === 10) {
    return SPRITES.TILE_TREE_GRASS_PINE;
  }
  if (num === 11) {
    return SPRITES.TILE_ROCK_GATE;
  }
  if (num === 12) {
    return SPRITES.TILE_SAND_MOUNTAIN;
  }
  if (num === 13) {
    return SPRITES.TILE_CAVE_FLOOR;
  }
  if (num === 14) {
    return SPRITES.TILE_CAVE_WALL;
  }
  if (num === 100) {
    return SPRITES.TILE_SAND;
  }
  if (num === 1000) {
    return SPRITES.TILE_SEA;
  }
}
