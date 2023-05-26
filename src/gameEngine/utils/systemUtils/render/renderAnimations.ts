import {ANIMATIONS, POSITION} from '../../../components/_ComponentNames';
import {ATTACK_CONFIG, TILE_SIZE, SPRITE_SIZE} from '../../../gameConstants';
import {assetLoader} from 'utils/assetLoader';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {BaseEntity} from '../../../BaseEntity';

function renderAnimations(systemArguments: ISystemArguments, entity: BaseEntity) {
  const {mapAPI} = systemArguments;

  for (const anim in entity.getRunningAnimations()) {
    const {currentFrame, frames} = entity[ANIMATIONS].runningAnimations[anim];

    const frame = frames[currentFrame];

    if (frame.spriteURL) {
      mapAPI.drawImage({
        id: `${entity.id}`,
        image: assetLoader.getAsset(frame.spriteURL),
        x: entity[POSITION].x - entity[POSITION].radius,
        y: entity[POSITION].y - entity[POSITION].radius,
        height: TILE_SIZE,
        width: TILE_SIZE,
        cropStartX: frame.cropStartX,
        cropStartY: frame.cropStartY,
        cropSizeX: SPRITE_SIZE,
        cropSizeY: SPRITE_SIZE,
        rotation: 0 // in radians
      });
    }

    if (frame.shape === 'ARC_SHAPE') {
      // we either render the X of the entity, or the animation X provided...
      const frameX = frame.x;
      const frameY = frame.y;

      const entityX = entity[POSITION].x - entity[POSITION].radius;
      const entityY = entity[POSITION].y - entity[POSITION].radius;

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
