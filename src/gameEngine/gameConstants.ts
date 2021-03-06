export const CANVAS_OUTPUT = 'CANVAS_OUTPUT';

export enum AllowedZoneLocationIDs {
  TOWN = 'TOWN',
  SPAWNABLE_1 = 'SPAWNABLE_1'
}

export enum AllowedUIShapes {
  CIRCLE_SHAPE = 'CIRCLE_SHAPE',
  ARC_SHAPE = 'ARC_SHAPE',
  MAP_TILE_SHAPE = 'MAP_TILE_SHAPE',
  RECT_SHAPE = 'RECT_SHAPE',
  HEALTH_BAR_SHAPE = 'HEALTH_BAR_SHAPE',
  CHEST_SHAPE = 'CHEST_SHAPE',
  PLAYER_CHAR = 'PLAYER_CHAR'
}

export enum AllowedActions {
  PERFORM_ACTION = 'PERFORM_ACTION',
  MOVE_ACTION = 'MOVE_ACTION',
  DRAG_PAN_MAP = 'DRAG_PAN_MAP',
  BUY_SKILL = 'BUY_SKILL',
  BUY_ATTR = 'BUY_ATTR'
}

export enum AllowedQuestIDs {
  CLEAR_CAMP = 'CLEAR_CAMP'
}

export enum CHARACTERS {
  ENEMY = 'ENEMY',
  FAM_NPC = 'FAM_NPC',
  CHEST = 'CHEST',
  IMP = 'IMP',
  GARGOYLE = 'GARGOYLE',
  DEMON = 'DEMON',
  VAMPIRE = 'VAMPIRE',
  PLAYER = 'PLAYER'
}

// TODO can these two be combined?
export enum DIRECTIONS_OPTIONS {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

// TODO can these two be combined?
export let DIRECTIONS = {
  [DIRECTIONS_OPTIONS.UP]: 'UP',
  [DIRECTIONS_OPTIONS.DOWN]: 'DOWN',
  [DIRECTIONS_OPTIONS.LEFT]: 'LEFT',
  [DIRECTIONS_OPTIONS.RIGHT]: 'RIGHT'
};

export const ANIMATIONS = {
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN'
};

export const TILE_SIZE = 32;

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
  width: 400 * 2,
  height: 240 * 2
};

export const ATTACK_CONFIG = {
  lineWidth: 3
};

export const CHAR_SPRITE_URL = 'src/assets/characters.png';
export const TILESET_IMAGE_URL = 'src/assets/tileSet.png';

export const XP_TO_FIRST_LEVEL = 500;
