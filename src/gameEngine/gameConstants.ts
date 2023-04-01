export const CANVAS_OUTPUT = 'CANVAS_OUTPUT';
import PLAYER_SPRITE_URL from '../assets/tileSet.png';
import TILESET_IMAGE_URL from '../assets/tileSet.png';
import ITEMS_SPRITE_URL from '../assets/misc.png';

export const WALKABLE_TILE_TYPES = [1, 7, 100, 13, 11];
export {PLAYER_SPRITE_URL, TILESET_IMAGE_URL, ITEMS_SPRITE_URL};

export enum AllowedZoneLocationIDs {
  TOWN = 'TOWN',
  SPAWNABLE_1 = 'SPAWNABLE_1'
}

export enum PossibleUIShapes {
  CIRCLE_SHAPE = 'CIRCLE_SHAPE',
  DROPPED_ITEM_SHAPE = 'DROPPED_ITEM_SHAPE',
  ARC_SHAPE = 'ARC_SHAPE',
  MAP_TILE_SHAPE = 'MAP_TILE_SHAPE',
  RECT_SHAPE = 'RECT_SHAPE',
  HEALTH_BAR_SHAPE = 'HEALTH_BAR_SHAPE',
  CHEST_SHAPE = 'CHEST_SHAPE',
  PLAYER_CHAR = 'PLAYER_CHAR',
  SPRITE = 'SPRITE'
}

/**
 * Most of our entities are placed here, some entities aren't here such as Tile or SHOCKWAVE
 */
export enum PLACEABLE_ENTITIES {
  ENEMY = 'ENEMY',
  FAM_NPC = 'FAM_NPC',
  ITEM = 'ITEM',
  CHEST = 'CHEST',
  IMP = 'IMP',
  GARGOYLE = 'GARGOYLE',
  DEMON = 'DEMON',
  VAMPIRE = 'VAMPIRE',
  PLAYER = 'PLAYER'
}

export enum AllowedActions {
  PERFORM_ACTION = 'PERFORM_ACTION',
  MOVE_ACTION = 'MOVE_ACTION',
  DRAG_PAN_MAP = 'DRAG_PAN_MAP',
  BUY_SKILL = 'BUY_SKILL',
  BUY_ATTR = 'BUY_ATTR',
  OPEN_INVENTORY = 'OPEN_INVENTORY',
  SHOW_HELP_SCREEN = 'SHOW_HELP_SCREEN'
}

export enum AllowedQuestIDs {
  CLEAR_CAMP = 'CLEAR_CAMP'
}

// TODO can these two be combined?
export enum DIRECTIONS {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

// TODO can these two be combined?
// export let DIRECTIONS = {
//   [DIRECTIONS.UP]: 'UP',
//   [DIRECTIONS.DOWN]: 'DOWN',
//   [DIRECTIONS.LEFT]: 'LEFT',
//   [DIRECTIONS.RIGHT]: 'RIGHT'
// };

export const ANIMATIONS = {
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN'
};

export const TILE_SIZE = 32;
export const SPRITE_SIZE = 32; // The size of a sprite in our sprite sheets

export enum ATTACK_SPEEDS_OPTIONS {
  SLOW = 'SLOW',
  FAST = 'FAST',
  FASTER = 'FASTER',
  FASTEST = 'FASTEST'
}

export const ATTACK_SPEEDS = {
  [ATTACK_SPEEDS_OPTIONS.SLOW]: 90,
  [ATTACK_SPEEDS_OPTIONS.FAST]: 70,
  [ATTACK_SPEEDS_OPTIONS.FASTER]: 60,
  [ATTACK_SPEEDS_OPTIONS.FASTEST]: 20
};

export const RESOLUTION = {
  width: 400 * 2, // 25 tiles
  height: 240 * 2 // 15 tiles
};

// Animation for the attacking arc
export const ATTACK_CONFIG = {
  lineWidth: 3
};

export const XP_TO_FIRST_LEVEL = 500;
