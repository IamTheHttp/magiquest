import IndexedTile from "classes/IndexedTile";
import {AllowedActions, AllowedUIShapes, CHARACTERS, DIRECTIONS_OPTIONS} from "gameConstants";

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
  characterType: CHARACTERS,
  characterLevel: number
}>;


/**
 * Incoming user actions
 */
export interface IAction {
  name: AllowedActions,
  direction?: DIRECTIONS_OPTIONS | 'space'; // TODO this is NOT okay(using 'space', maybe the enum is not direction options...
}


/**
 * ANIMATION INTERFACES
 */

export interface IAnimationMap {
  [key:string]: IAnimation;
}

/**
 * TODO -- Two different functionalities are encapsulated here
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

