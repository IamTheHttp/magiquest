/**
 * Created by patrik.tolosa on 2019-10-23.

 */
import BaseEntity from 'BaseEntity';
import PositionComponent from 'components/PositionComponent';
import UIComponent from 'components/UIComponent';
import AnimationComp from 'components/AnimationComp';
import {bit} from 'config';
import {ARC_SHAPE} from 'gameConstants';


function getCenterPosOfTile(tileIdx) {
  let col = tileIdx.split('-')[0]; // TODO this is used elsewhere, we might want to put it as a function
  let row = tileIdx.split('-')[1];

  return {
    x: col * bit + bit / 2,
    y: row * bit + bit / 2
  };
}


class ShockWave {
  constructor({x, y, radius = 16, fromTileIdx, toTileIdx, color = 'red'}) {
    let entity = new BaseEntity(ShockWave);

    entity.addComponent(new PositionComponent({x, y, radius}));
    entity.addComponent(new UIComponent());

    let origin = getCenterPosOfTile(fromTileIdx);
    let target = getCenterPosOfTile(toTileIdx);
    let deltaX = target.x - origin.x;
    let deltaY = target.y - origin.y;
    let direction;

    if (deltaX === 0) {
      direction = deltaY > 0 ? 0.5 : -0.5;
    } else if (deltaY === 0) {
      direction = deltaX > 0 ? 0 : 1;
    } else {
      direction = Math.atan(deltaY / deltaX);
    }

    let frames = [];
    let frameCount = 15;
    let animationDuration = 15;
    let i = 0;

    let sizeToGrow = 0.1;
    let radiusToGrow = 20;

    while (i < frameCount) {
      frames.push({
        shape: ARC_SHAPE,
        direction,
        size: 0.2 + i * sizeToGrow / frameCount,
        radius: 16 + i * radiusToGrow / frameCount,
        x: origin.x,
        y: origin.y,
        color
      });

      i++;
    }

    entity.addComponent(new AnimationComp({
      SHOCKWAVE: {
        animationDuration, // each 'frame' takes this many
        frames,
        animationName: 'SHOCKWAVE',
        loops: false
      }
    }));


    entity.addAnimation(entity.getAnimationTypes().SHOCKWAVE);

    return entity;
  }
}

export default ShockWave;