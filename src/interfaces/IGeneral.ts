import {AllowedActions, PossibleUIShapes, DIRECTIONS} from '../gameEngine/gameConstants';
import {PlayerStateChangeEvent} from '../gameEngine/classes/PlayerState';
import IndexedTile from '../gameEngine/classes/IndexedTile';
import {AllowedSkills} from '../data/skillConfig';
import {IAssignedCharacterAttributes} from '../gameEngine/components/CharacterAttributesComponent';

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
 * TODO - We've moved away to use getSprites() for all the sprites in the game, we should consolidate these as well.
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
  shape?: keyof typeof PossibleUIShapes;
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
  ticksRunning: number;
  animationDurationInTicks: number;
}

/**
 * CANVAS RENDER INTERFACES
 */
export interface IUISection {
  name: string;
  shape: keyof typeof PossibleUIShapes;
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
