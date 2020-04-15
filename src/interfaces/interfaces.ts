import IndexedTile from "classes/IndexedTile";
import {AllowedActions, AllowedUIShapes, CHARACTERS, DIRECTIONS_OPTIONS} from "gameConstants";
import {HEALTH_COMP} from "components/ComponentNamesConfig";

/**
 * Represents the resolution properties of the game
 * "view" - represents the main view (player view), main screen.
 * "map" - represents the the entire map, so viewWidth <= mapWidth
 */
export interface IViewSize {
  viewHeight: number
  viewWidth: number
  mapHeight: number
  mapWidth: number
}

export interface ITileIndexMap {
  [key: string]: IndexedTile
}

export type ISpawnableEnemies = Array<{
  chance: number,
  characterType: CHARACTERS
}>;


/**
 * Incoming user actions
 */
export interface IAction {
  name: AllowedActions,
  direction?: DIRECTIONS_OPTIONS
}


/**
 * ANIMATION INTERFACES
 */

export interface IAnimationMap {
  [key:string]: IAnimation;
}

/**
 * TODO -- Two different functionalities are encapsulated here - which?
 * TODO cropStart X/y should extend from {ISprite}
 * TODO this is ALL optional, which means we did something wrong!
 * The animation frame can work on two different levels
 * 1. Pass spriteURL
 * 2. Pass a shape, with information regarding it
 */

export interface IAnimationFrame{
  spriteURL?: string;
  cropStartX?:number;
  cropStartY?: number;
  cropSizeX?:number
  cropSizeY?:number;
  shape?: AllowedUIShapes;
  direction?:number; // TODO this is confusing as we already have a string direction - rename to ANGLE_DIRECTION
  size?: number;
  radius?:number;
  x?:number;
  y?:number;
  color?:string;
}

export interface IAnimation {
  animationName: string,
  frames: IAnimationFrame[],
  currentFrame: number,
  loops: boolean,
  size: number,
  speed: number,
  realFrameCount:number,
  animationDuration: number
}

/**
 * CANVAS RENDER INTERFACES
 */
export interface IUISection {
  name: string;
  shape: AllowedUIShapes;
  data: {
    [key: string] : any // TODO can we narrow it down?
  };
}

export interface IUIEvent {
  type:string;
  name:string;
}

export interface IPlayerHealthChange extends IUIEvent{
  type: 'UI_EVENT',
  name: 'PLAYER_HEALTH_CHANGE',
  maxHealth: number,
  currentHealth: number,
  percentHealth: number
}


export interface IPlayerUIState {
  maxHealth: number,
  currentHealth: number,
  percentHealth: number,
  showSkillTree: boolean
}

/**
 * FUNCTION TYPES
 */
export type IListenToUIEvents = (event: IPlayerHealthChange) => void;