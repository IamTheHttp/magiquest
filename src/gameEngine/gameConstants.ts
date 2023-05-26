export const CANVAS_OUTPUT = 'CANVAS_OUTPUT';
import TILESET_IMAGE_URL from '../assets/tileSet.png';
import ITEMS_SPRITE_URL from '../assets/misc.png';

/**
 * Rendering constants
 */
export const HUD_PADDING_LEFT_RIGHT = 20;
export const HUD_PADDING_TOP_BOTTOM = 20;
export const HUD_ITEM_FILL_COLOR = 'rgba(255,255,255,0.6)';
export const HUD_ITEM_BORDER_COLOR = 'green';

/**
 * Other constants
 */

export const WALKABLE_TILE_TYPES = [1, 7, 100, 13, 11];
export {TILESET_IMAGE_URL, ITEMS_SPRITE_URL};

export const ALLOWED_ZONE_LOCATION_IDS = ['TOWN', 'SPAWNABLE_1', 'FOO'] as const;
export type I_ALLOWED_ZONE_LOCATION_IDS = (typeof ALLOWED_ZONE_LOCATION_IDS)[number];

export const POSSIBLE_UI_SHAPES = [
  'CIRCLE_SHAPE',
  'DROPPED_ITEM_SHAPE',
  'ARC_SHAPE',
  'MAP_TILE_SHAPE',
  'RECT_SHAPE',
  'HEALTH_BAR_SHAPE',
  'CHEST_SHAPE',
  'PLAYER_CHAR',
  'SPRITE'
];
export type I_POSSIBLE_UI_SHAPES = (typeof POSSIBLE_UI_SHAPES)[number];

/**
 * Most of our entities are placed here, some entities aren't here such as Tile or SHOCKWAVE
 */

export const PLACEABLE_ENTITIES = [
  'ENEMY',
  'FAM_NPC',
  'ITEM',
  'CHEST',
  'IMP',
  'GARGOYLE',
  'DEMON',
  'VAMPIRE',
  'PLAYER'
] as const;
export type I_PLACEABLE_ENTITIES = (typeof PLACEABLE_ENTITIES)[number];

export const ALLOWED_ACTIONS = [
  'PERFORM_ACTION',
  'MOVE_ACTION',
  'DRAG_PAN_MAP',
  'BUY_SKILL',
  'BUY_ATTR',
  'OPEN_INVENTORY',
  'SHOW_HELP_SCREEN'
] as const;
export type I_ALLOWED_ACTIONS = (typeof ALLOWED_ACTIONS)[number];

export const ALLOWED_QUEST_IDS = ['CLEAR_CAMP'] as const;
export type I_ALLOWED_QUEST_IDS = (typeof ALLOWED_QUEST_IDS)[number];

export const DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
export type I_DIRECTIONS = (typeof DIRECTIONS)[number];

export const ANIMATIONS = {
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN'
};

export const TILE_SIZE = 32;
export const SPRITE_SIZE = 32; // The size of a sprite in our sprite sheets

export const ATTACK_SPEED_OPTIONS = ['SLOW', 'FAST', 'FASTER', 'FASTEST', 'NONE'] as const;
export type I_ATTACK_SPEED_OPTIONS = (typeof ATTACK_SPEED_OPTIONS)[number];

export const ATTACK_SPEEDS: {[key in I_ATTACK_SPEED_OPTIONS]: number} = {
  NONE: 0,
  SLOW: 90,
  FAST: 70,
  FASTER: 60,
  FASTEST: 20
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
