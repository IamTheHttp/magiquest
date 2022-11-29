/**
 * Represents the resolution properties of the game
 * "view" - represents the main view (player view), main screen.
 * "map" - represents the the entire map, so viewWidth <= mapWidth
 */ import {AllowedActions, AllowedUIShapes, DIRECTIONS} from '../gameEngine/gameConstants';
import {PlayerStateChangeEvent} from '../gameEngine/classes/PlayerState';
import IndexedTile from '../gameEngine/classes/IndexedTile';
import {AllowedSkills} from '../data/skillConfig';
import {IAssignedCharacterAttributes} from '../gameEngine/components/CharacterAttributesComponent';

export interface IViewSize {
  viewHeight: number;
  viewWidth: number;
  mapHeight: number;
  mapWidth: number;
}

export interface ITileIndexMap {
  [key: string]: IndexedTile;
}

/**
 * Incoming user actions
 */
export interface IAction {
  name: keyof typeof AllowedActions;
  data?: {
    // todo move direction into data
    [key: string]: any;
  };
  direction?: keyof typeof DIRECTIONS;
}

/**
 * ANIMATION INTERFACES
 */

export interface IAnimationMap {
  [key: string]: IAnimation;
}

/**
 * TODO -- Two different functionalities are encapsulated here - which?
 * TODO cropStart X/y should extend from {ISprite}
 * TODO this is ALL optional, which means we did something wrong!
 * The animation frame can work on two different levels
 * 1. Pass spriteURL
 * 2. Pass a shape, with information regarding it
 */

export interface IAnimationFrame {
  spriteURL?: string;
  cropStartX?: number;
  cropStartY?: number;
  cropSizeX?: number;
  cropSizeY?: number;
  shape?: keyof typeof AllowedUIShapes;
  direction?: number; // TODO this is confusing as we already have a string direction - rename to ANGLE_DIRECTION
  size?: number;
  radius?: number;
  x?: number;
  y?: number;
  color?: string;
}

export interface IAnimation {
  animationName: string;
  frames: IAnimationFrame[];
  currentFrame: number;
  loops: boolean;
  size: number;
  speed: number;
  realFrameCount: number;
  animationDuration: number;
}

/**
 * CANVAS RENDER INTERFACES
 */
export interface IUISection {
  name: string;
  shape: keyof typeof AllowedUIShapes;
  data: {
    [key: string]: any; // TODO can we narrow it down?
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
  skills: (keyof typeof AllowedSkills)[];
  spendableXP: number;
  levelProgress: number;
  attributes: IAssignedCharacterAttributes;
  spendableAttributePoints: number;
}

export interface IPlayerUIState extends IPlayerState {
  showSkillTree: boolean;
  showAttributes: boolean;
  showInventory: boolean;
}

/**
 * FUNCTION TYPES
 */
export type IGameEventListener = (event: PlayerStateChangeEvent) => void;

export interface ISprite {
  cropStartX: number;
  cropStartY: number;
  cropSizeX: number;
  cropSizeY: number;
}

export interface ITileTypes {
  [key: number]: ISprite;
}
