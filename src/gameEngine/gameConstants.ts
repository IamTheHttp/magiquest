export const CANVAS_OUTPUT = 'CANVAS_OUTPUT';

export enum AllowedLevelLocationIDs {
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
  PERFORM_ACTION = "PERFORM_ACTION",
  MOVE_ACTION = "MOVE_ACTION"
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
  RIGHT = 'RIGHT',
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

