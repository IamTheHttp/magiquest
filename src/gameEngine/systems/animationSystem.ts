import {ANIMATION_COMP} from '../components/_ComponentNamesConfig';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {BaseEntity} from '../BaseEntity';

function animationSystem(systemArguments: ISystemArguments) {
  const {Entity} = systemArguments;
  const entities = Entity.getByComps<BaseEntity>([ANIMATION_COMP]);

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const runningAnimations = entity[ANIMATION_COMP].runningAnimations;

    for (const animationName in runningAnimations) {
      const animation = runningAnimations[animationName];
      animation.ticksRunning = animation.ticksRunning || 0;

      // Example: An animation can be constructed from 4 images, length would be 4.
      const animationFrameCount = animation.frames.length;

      const durationInTicks = animation.animationDurationInTicks;
      const singleFrameDurationInTicks = durationInTicks / animationFrameCount;

      // ticksRunning starts at 0, if we're equal to the duration it means
      // we're 1 tick over, so we're done.
      const isOver = animation.ticksRunning === durationInTicks;

      if (isOver && animation.loops) {
        // Reset the animation, start again
        animation.currentFrame = 0;
        // Reset the animation, start again
        animation.ticksRunning = 0;
      } else if (isOver && !animation.loops) {
        entity.removeRunningAnimation(animation.animationName);
      } else {
        animation.currentFrame = Math.floor(animation.ticksRunning / singleFrameDurationInTicks);
        // Debugging for animation
        if (entity.isPlayer() && false) {
          console.table({
            animationTicks: `${animation.ticksRunning + 1} / ${durationInTicks}`,
            durationInTicks,
            // Starting at 0, so adding one for a better display
            numberOfAnimationFrames: animation.frames.length,
            frameDuration: singleFrameDurationInTicks,
            // adding 1 for a better display
            currentAnimationFrame: animation.currentFrame + 1
          });
        }

        animation.ticksRunning++;
      }
    }
  }
}

export default animationSystem;
