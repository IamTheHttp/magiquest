import {ANIMATION_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {ANIMATIONS} from '../../../gameConstants';

function renderAnimations(systemArguments, entity) {
  let {mapAPI} = systemArguments;
  let {x: curX, y: curY, radius, direction: curDirection} = entity[POSITION_COMP];
  let adjustRadiusSize = 0;
  let adjustY = 0;
  
  for (let anim in entity[ANIMATION_COMP].animations) {
    let {currentFrame, frames, animationName, size} = entity[ANIMATION_COMP].animations[anim];

  
    if (animationName === ANIMATIONS.BREATHING) {
      // pxToMove 16 * 0.25 = 4; * 30 / 100 == 1.2
      // pxToMove 16 * 0.25 = 4; * 40 / 100 == 1.6
      // pxToMove 16 * 0.25 = 4; * 50 / 100 == 2
      // pxToMove 16 * 0.25 = 4; * 60 / 100 == 2
      adjustRadiusSize = radius * size * Math.min(currentFrame, frames - currentFrame) / frames;
    }
  
    if (animationName === ANIMATIONS.IDLE) {
      adjustY = radius * size * Math.min(currentFrame, frames - currentFrame) / frames;
    }
  }
  
  // we want, for UI purposes only and NOT actual entity state, to modify the radius
  // TODO this works because we override the 'id' of what we draw
  // TODO - a bit wasteful, as we add the shape twice - once in the renderCircle and once here
  mapAPI.addCircle(
    {
      id: `${entity.id}`,
      x: curX,
      y: curY - adjustY,
      radius: radius - adjustRadiusSize,
      fillColor: 'red',
      strokeStyle: 'red',
      lineWidth: 1
    }
  );
}


export default renderAnimations;