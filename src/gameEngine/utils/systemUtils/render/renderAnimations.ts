import {HAS_ANIMATIONS, POSITION_COMP} from '../../../components/_ComponentNamesConfig';
import {PossibleUIShapes, ATTACK_CONFIG, TILE_SIZE, SPRITE_SIZE} from '../../../gameConstants';
import {assetLoader} from 'utils/assetLoader';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../BaseEntity';

function renderAnimations(systemArguments: ISystemArguments, entity: BaseEntity) {
  let {mapAPI} = systemArguments;

  for (let anim in entity.getRunningAnimations()) {
    let {currentFrame, frames} = entity[HAS_ANIMATIONS].runningAnimations[anim];

    let frame = frames[currentFrame];

    if (frame.spriteURL) {
      mapAPI.drawImage({
        id: `${entity.id}`,
        image: assetLoader.getAsset(frame.spriteURL),
        x: entity[POSITION_COMP].x - entity[POSITION_COMP].radius,
        y: entity[POSITION_COMP].y - entity[POSITION_COMP].radius,
        height: TILE_SIZE,
        width: TILE_SIZE,
        cropStartX: frame.cropStartX,
        cropStartY: frame.cropStartY,
        cropSizeX: SPRITE_SIZE,
        cropSizeY: SPRITE_SIZE,
        rotation: 0 // in radians
      });
    }

    if (frame.shape === PossibleUIShapes.ARC_SHAPE) {
      // we either render the X of the entity, or the animation X provided...
      let frameX = frame.x;
      let frameY = frame.y;

      let entityX = entity[POSITION_COMP].x - entity[POSITION_COMP].radius;
      let entityY = entity[POSITION_COMP].y - entity[POSITION_COMP].radius;

      mapAPI.drawArc({
        id: `${entity.id}`,
        x: frameX,
        y: frameY,
        radius: frame.radius,
        size: frame.size,
        direction: frame.direction,
        lineWidth: ATTACK_CONFIG.lineWidth,
        color: frame.color
      });
    }
  }
}

export default renderAnimations;
