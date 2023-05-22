import {I_ALLOWED_ACTIONS, PossibleUIShapes, DIRECTIONS} from '../gameEngine/gameConstants';
import {PlayerStateChangeEvent} from '../gameEngine/classes/PlayerState';
import IndexedTile from '../gameEngine/classes/IndexedTile';

/**
 * Represents the resolution properties of the game
 * "view" - represents the main view (player view), main screen.
 * "map" - represents the entire map, so viewWidth <= mapWidth
 */
export interface IViewSize {
  viewHeight: number;
  viewWidth: number;
  mapHeight: number;
  mapWidth: number;
}

export interface IIndexedTileMap {
  [key: string]: IndexedTile;
}

/**
 * Incoming user actions
 */
export interface IAction {
  name: I_ALLOWED_ACTIONS;
  data?: {
    // todo move direction into data
    [key: string]: any;
  };
  direction?: keyof typeof DIRECTIONS;
}

/**
 * CANVAS RENDER INTERFACES
 */
export interface IUISection {
  name: string;
  shape: keyof typeof PossibleUIShapes;
  data: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    spriteName?: string;
    tileType?: number;
  };
}

export interface IUIEvent {
  type: string;
  name: string;
}

export interface IPlayerState {
  maxHealth: number;
  currentHealth: number;
  percentHealth: number;
  spendableXP: number;
  levelProgress: number;
}

/**
 * FUNCTION TYPES
 */
export type IGameEventListener = (event: PlayerStateChangeEvent) => void;
