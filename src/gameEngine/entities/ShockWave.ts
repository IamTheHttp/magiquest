/**
 * Created by patrik.tolosa on 2019-10-23.

 */
import {BaseEntity} from 'gameEngine/BaseEntity';
import PositionComponent from 'gameEngine/components/PositionComponent';
import UIComponent from 'gameEngine/components/UIComponent';
import AnimationComp from 'gameEngine/components/AnimationComp';
import {AllowedUIShapes, bit} from 'gameEngine/gameConstants';
import getColRowByTileIdx from "../utils/getColRowByTileIdx";


function getCenterPosOfTile(tileIdx: string) {
  let {col, row} = getColRowByTileIdx(tileIdx);

  return {
    x: col * bit + bit / 2,
    y: row * bit + bit / 2
  };
}

interface IShockWaveConstructor {
  x: number,
  y: number,
  radius?: number,
  fromTileIdx: string,
  toTileIdx: string,
  color?:string
}


class ShockWave {
  constructor({x, y, radius = 16, fromTileIdx, toTileIdx, color = 'red'}: IShockWaveConstructor) {
    let entity = new BaseEntity(ShockWave);

    entity.addComponent(new PositionComponent({x, y, radius}));
    entity.addComponent(new UIComponent([]));

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
        shape: AllowedUIShapes.ARC_SHAPE,
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