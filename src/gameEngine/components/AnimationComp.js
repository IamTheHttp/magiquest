import {ANIMATION_COMP} from 'components/ComponentNamesConfig';
import assertType from 'utils/assertType';

class AnimationComp {
  constructor(animationTypes) {
    this.name = ANIMATION_COMP;
    this.animations = {};
    this.animationTypes = animationTypes;
  }
  
  addAnimationVariant({animationName, frames = [], loops = false, size = 0.25, speed, ...rest} = {}) {
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
      realFrameCount:0
    };
  };
}

export default AnimationComp;