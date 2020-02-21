import { ANIMATION_COMP } from '../components/ComponentNamesConfig';
import { bit } from 'gameEngine/config';
function animationSystem(systemArguments) {
    var Entity = systemArguments.Entity;
    // Animation system
    var ents = Entity.getByComps([ANIMATION_COMP]);
    for (var i = 0; i < ents.length; i++) {
        var entity = ents[i];
        var animations = entity[ANIMATION_COMP].animations;
        for (var anim in animations) {
            var animation = animations[anim];
            animation.realFrameCount = animation.realFrameCount || 0;
            var numberOfFrames = animation.frames.length - 1;
            var isOver = animation.currentFrame >= numberOfFrames;
            if (isOver && animation.loops) {
                animation.currentFrame = 0;
                animation.realFrameCount = 0;
            }
            else if (isOver && !animation.loops) {
                entity.removeAnimation(animation.animationName);
            }
            else {
                // the duration of the animation is the time it takes to cross a bit (32px)
                var animationDuration = animation.animationDuration || (bit / entity.getMovementSpeed()) / numberOfFrames;
                animation.realFrameCount++;
                // the animation lasts for {animationDuration} frames (bigger = longer)
                // the animation has {numberOfFrames}
                // each frameDuration is {animationDuration / numberOfFrames}
                // current frame is Math.min{realFrameCount / frameDuration}
                var frameDuration = animationDuration / numberOfFrames;
                animation.currentFrame = Math.floor(animation.realFrameCount / frameDuration);
            }
        }
    }
}
export default animationSystem;
