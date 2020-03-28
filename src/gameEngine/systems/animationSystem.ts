import {ANIMATION_COMP} from '../components/ComponentNamesConfig';
import {bit} from 'gameEngine/config';
import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../interfaces/gameloop.i";

function animationSystem(systemArguments: ISystemArguments) {
  let {Entity} = systemArguments;
  // Animation system
  let ents = Entity.getByComps([ANIMATION_COMP]) as BaseEntity[];

  for (let i = 0; i < ents.length; i++) {
    let entity = ents[i];
    let animations = entity[ANIMATION_COMP].animations;
    
    
    for (let anim in animations) {
      let animation = animations[anim];
      animation.realFrameCount = animation.realFrameCount || 0;
      
      let numberOfFrames = animation.frames.length - 1;
      let isOver = animation.currentFrame >= numberOfFrames;
      
      if (isOver && animation.loops) {
        animation.currentFrame = 0;
        animation.realFrameCount = 0;
      } else if (isOver && !animation.loops) {
        entity.removeAnimation(animation.animationName);
      } else {
        // the duration of the animation is the time it takes to cross a bit (32px)
        let animationDuration = animation.animationDuration || (bit / entity.getMovementSpeed()) / numberOfFrames;

        animation.realFrameCount++;
        // the animation lasts for {animationDuration} frames (bigger = longer)
        // the animation has {numberOfFrames}
        // each frameDuration is {animationDuration / numberOfFrames}
        // current frame is Math.min{realFrameCount / frameDuration}

        let frameDuration = animationDuration / numberOfFrames;

        animation.currentFrame = Math.floor(animation.realFrameCount / frameDuration);
      }
    }
  }
}

export default animationSystem;


