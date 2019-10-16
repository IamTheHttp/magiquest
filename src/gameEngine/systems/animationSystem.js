import {ANIMATION_COMP} from '../components/ComponentNamesConfig';

function animationSystem(systemArguments) {
  let {Entity} = systemArguments;
  // Animation system
  let ents = Entity.getByComps([ANIMATION_COMP]);
  
  for (let i = 0; i < ents.length; i++) {
    let ent = ents[i];
    let animations = ent[ANIMATION_COMP].animations;
    
    
    for (let anim in animations) {
      let animation = animations[anim];
      let isOver = animation.currentFrame >= animation.frames;
      
      if (isOver && animation.loops) {
        animation.currentFrame = 0;
      } else if (isOver && !animation.loops) {
        ent.removeAnimation(animation.animationName);
      } else {
        animation.currentFrame++;
      }
    }
  }
}

export default animationSystem;


