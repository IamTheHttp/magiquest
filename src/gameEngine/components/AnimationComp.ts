import {ANIMATION_COMP} from 'gameEngine/components/ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';

class AnimationComp {
  name: string;
  animations: object;
  animationTypes: any;
  constructor(animationTypes) {
    this.name = ANIMATION_COMP;
    this.animations = {};
    this.animationTypes = animationTypes;
  }
  
  addAnimationVariant({animationName = '', frames = [], loops = false, size = 0.25, speed= 1, animationDuration = 0, ...rest} = {}) {
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
      realFrameCount:0,
      animationDuration
    };
  };
}

export default AnimationComp;