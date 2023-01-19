import {ANIMATION_COMP} from '../components/ComponentNamesConfig';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {BaseEntity} from '../BaseEntity';
import {TILE_SIZE} from '../gameConstants';

function animationSystem(systemArguments: ISystemArguments) {
  let {Entity} = systemArguments;
  // Animation system
  let ents = Entity.getByComps<BaseEntity>([ANIMATION_COMP]);

  for (let i = 0; i < ents.length; i++) {
    let entity = ents[i];
    let animations = entity[ANIMATION_COMP].animations;

    for (let anim in animations) {
      let animation = animations[anim];
      animation.animationTicks = animation.animationTicks || 0;

      let numberOfFrames = animation.frames.length - 1;
      let isOver = animation.currentFrame >= numberOfFrames;

      if (isOver && animation.loops) {
        animation.currentFrame = 0;
        animation.animationTicks = 0;
      } else if (isOver && !animation.loops) {
        entity.removeAnimation(animation.animationName);
      } else {
        // TODO the below code is very specific to movement
        // the duration of the animation is the time it takes to cross a TILE_SIZE
        let animationDurationInTicks =
          animation.animationDurationInTicks || TILE_SIZE / entity.getMovementSpeed() / numberOfFrames;

        animation.animationTicks++;
        // the animation lasts for {animationDurationInTicks} frames (bigger = longer)
        // the animation has {numberOfFrames}
        // each frameDuration is {animationDurationInTicks / numberOfFrames}
        // current frame is Math.min{animationTicks / frameDuration}

        let frameDuration = animationDurationInTicks / numberOfFrames;

        animation.currentFrame = Math.floor(animation.animationTicks / frameDuration);
      }
    }
  }
}

export default animationSystem;
