import {ANIMATION_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {ANIMATIONS} from '../../../gameConstants';

function renderAnimations(systemArguments, entity) {
  let {radius} = entity[POSITION_COMP];
  let adjustRadiusSize = 0;
  let adjustY = 0;
  
  for (let anim in entity[ANIMATION_COMP].animations) {
    let {currentFrame, frames, animationName, size} = entity[ANIMATION_COMP].animations[anim];

    if (animationName === ANIMATIONS.BREATHING) {
      adjustRadiusSize = radius * size * Math.min(currentFrame, frames - currentFrame) / frames;
    }
  
    if (animationName === ANIMATIONS.IDLE) {
      adjustY = radius * size * Math.min(currentFrame, frames - currentFrame) / frames;
    }
  }
}


export default renderAnimations;