import {ANIMATION_COMP, POSITION_COMP} from '../../../components/ComponentNamesConfig';
import {ANIMATIONS} from '../../../gameConstants';
import {assetLoader} from 'cache/assetLoader';
import {bit} from 'config';

function renderAnimations(systemArguments, entity) {
  let {mapAPI} = systemArguments;

  for (let anim in entity.getAnimations()) {
    let {currentFrame, frames, animationName, size} = entity[ANIMATION_COMP].animations[anim];

    let frame = frames[currentFrame];

    mapAPI.addImage(
      {
        id: `${entity.id}`,
        image: assetLoader.getAsset(frame.spriteURL),
        x: entity[POSITION_COMP].x - entity[POSITION_COMP].radius,
        y: entity[POSITION_COMP].y - entity[POSITION_COMP].radius,
        height: 32,
        width: 32,
        cropStartX: frame.cropStartX,
        cropStartY: frame.cropStartY,
        cropSizeX: bit,
        cropSizeY: bit,
        rotation: 0 // in radians
      }
    );
  }
}


export default renderAnimations;