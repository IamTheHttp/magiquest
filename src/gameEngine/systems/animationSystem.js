import {ANIMATION_COMP} from '../components/ComponentNamesConfig';
import {bit} from 'config';

function animationSystem(systemArguments) {
  let {Entity} = systemArguments;
  // Animation system
  let ents = Entity.getByComps([ANIMATION_COMP]);
  
  for (let i = 0; i < ents.length; i++) {
    let entity = ents[i];
    let animations = entity[ANIMATION_COMP].animations;
    
    
    for (let anim in animations) {
      let animation = animations[anim];
      animation.realFrameCount = animation.realFrameCount || 0;
      
      let framesLength = animation.frames.length - 1;
      let isOver = animation.currentFrame >= framesLength;
      
      if (isOver && animation.loops) {
        animation.currentFrame = 0;
        animation.realFrameCount = 0;
      } else if (isOver && !animation.loops) {
        entity.removeAnimation(animation.animationName);
      } else {
        let movementSpeed = entity.getMovementSpeed();
        
        // the duration of the animation is the time it takes to cross a bit (32px)
        let frameRatio = (bit / movementSpeed) / framesLength;
  
        animation.realFrameCount++;
        animation.currentFrame = Math.floor(animation.realFrameCount / frameRatio);
      }
    }
  }
}

export default animationSystem;


