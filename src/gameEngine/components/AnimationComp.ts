import {ANIMATION_COMP} from 'gameEngine/components/ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {IAnimationFrame, IAnimationMap} from '../../interfaces/IGeneral';

export interface IAnimationVariantArguments {
  animationName: string;
  frames: IAnimationFrame[];
  loops: boolean;
  size?: number;
  speed?: number;
  animationDuration?: number;
}

export interface IAnimationTypes {
  [key: string]: {
    frames: IAnimationFrame[];
    animationName: string;
    loops: boolean;
    animationDuration?: number; // This is optional as we have some internal default
  };
}

class AnimationComp {
  name: string;
  animations: IAnimationMap;
  animationTypes: IAnimationTypes;
  constructor(animationTypes: IAnimationTypes) {
    this.name = ANIMATION_COMP;
    this.animations = {};
    this.animationTypes = animationTypes;
  }

  addAnimationVariant({
    animationName = '',
    frames = [],
    loops = false,
    size = 0.25,
    speed = 1,
    animationDuration = 0,
    ...rest
  }: IAnimationVariantArguments) {
    assertType(animationName, 'Name of animation', 'string');
    if (Object.keys(rest).length > 0) {
      throw `Extra arguments not supported to addAnimationVariant ${JSON.stringify(Object.keys(rest))}`;
    }

    this.animations[animationName] = {
      animationName,
      frames,
      currentFrame: 0,
      loops,
      size,
      speed,
      animationTicks: 0,
      animationDurationInTicks: animationDuration
    };
  }
}

export default AnimationComp;
