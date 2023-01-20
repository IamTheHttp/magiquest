import {ANIMATION_COMP} from 'gameEngine/components/ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {PossibleUIShapes} from '../gameConstants';

export type IAnimationDefinition = {
  animationName: string;
  frames: IAnimationFrame[];
  loops: boolean;
  animationDurationInTicks: number;
};

/**
 * A single Animation Frame
 * Can be configured to either use a SpriteURL, or a UI Shape
 * If using a UI Shape, `size` can be used to control the size of the shape (in pixels)
 * // TODO perhaps we can split into two frame definition - ShapeAnimation and SpriteAnimation
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

/**
 * A running Animation, with ticksRunning and currentFrame
 */
export interface IRunningAnimation extends IAnimationDefinition {
  currentFrame: number;
  ticksRunning: number;
}

/**
 * Interfaces to differentiate between a running Animation, and a New Animation
 */
export type IAnimationDefinitionMap = Record<string, IAnimationDefinition>;
export type IRunningAnimationMap = Record<string, IRunningAnimation>;

export class AnimationComp {
  name: string;
  runningAnimations: IRunningAnimationMap;
  possibleAnimationsForEntity: IAnimationDefinitionMap;

  constructor(possibleAnimationsForEntity: IAnimationDefinitionMap) {
    this.name = ANIMATION_COMP;
    this.runningAnimations = {};
    this.possibleAnimationsForEntity = possibleAnimationsForEntity;
  }

  addAnimationToRun(animationDefinition: IAnimationDefinition) {
    const {animationName, frames, loops, animationDurationInTicks, ...rest} = animationDefinition;

    assertType(animationName, 'Name of animation', 'string');
    if (Object.keys(rest).length > 0) {
      debugger;
      throw `Extra arguments not supported to animationDefinition ${JSON.stringify(Object.keys(rest))}`;
    }

    this.runningAnimations[animationName] = {
      animationName,
      frames,
      loops,
      animationDurationInTicks,
      currentFrame: 0,
      ticksRunning: 0
    };
  }
}
