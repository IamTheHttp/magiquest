import {ANIMATION_COMP} from 'components/ComponentNamesConfig';

class AnimationComp {
  constructor() {
    this.name = ANIMATION_COMP;
    this.animations = {};
  }
  
  addAnimationVariant({animationName, frames = 60, loops = false, size = 0.25}) {
    this.animations[animationName] = {
      animationName,
      frames,
      currentFrame: 0,
      loops,
      size
    };
  };
}

export default AnimationComp;