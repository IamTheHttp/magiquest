export const CIRCLE_SHAPE = 'CIRCLE_SHAPE';
export const ARC_SHAPE = 'ARC_SHAPE';
export const CANVAS_OUTPUT = 'CANVAS_OUTPUT';
export const MAP_TILE_SHAPE = 'MAP_TILE_SHAPE';
export const RECT_SHAPE = 'RECT_SHAPE';
export const HEALTH_BAR_SHAPE = 'HEALTH_BAR_SHAPE';
export const CHEST_SHAPE = 'CHEST_SHAPE';
export const PLAYER_CHAR = 'PLAYER_CHAR';

export enum AllowedActions {
  PERFORM_ACTION = "PERFORM_ACTION",
  MOVE_ACTION = "MOVE_ACTION"
}


export enum CHARACTERS {
  SENTRY = 'SENTRY',
  FAM_NPC = 'FAM_NPC',
  CHEST = 'CHEST'
}


// TODO can these two be combined?
export enum DIRECTIONS_OPTIONS {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

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

