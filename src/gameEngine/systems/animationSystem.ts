import {ANIMATION_COMP} from '../components/ComponentNamesConfig';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {BaseEntity} from '../BaseEntity';
import {TILE_SIZE} from '../gameConstants';

function animationSystem(systemArguments: ISystemArguments) {
  const {Entity} = systemArguments;
  // Animation system
  const ents = Entity.getByComps<BaseEntity>([ANIMATION_COMP]);

  for (let i = 0; i < ents.length; i++) {
    const entity = ents[i];
    const animations = entity[ANIMATION_COMP].animations;

    for (const anim in animations) {
      const animation = animations[anim];
      animation.ticksRunning = animation.ticksRunning || 0;

      // Example: An animation can be constructed from 4 images, length would be 4.
      const animationFrameCount = animation.frames.length;

      // the duration of the animation is the time it takes to cross a TILE_SIZE
      const ticksToCrossTile = TILE_SIZE / entity.getMovementSpeed();

      // animation duration in ticks, if not specified we use the time to cross a tile
      // TODO this is to avoid specified animationDuration for movement, animationDurationInTicks should be set on the Entity
      const durationInTicks = animation.animationDurationInTicks || ticksToCrossTile;
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
        entity.removeAnimation(animation.animationName);
      } else {
        animation.currentFrame = Math.floor(animation.ticksRunning / singleFrameDurationInTicks);
        // Debugging for animation
        if (entity.isPlayer() && false) {
          console.table({
            animationTicks: `${animation.ticksRunning + 1} / ${durationInTicks}`,
            ticksToCrossTile,
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
