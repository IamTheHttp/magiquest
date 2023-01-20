/**
 * Created by patrik.tolosa on 2019-10-23.

 */
import {BaseEntity} from 'gameEngine/BaseEntity';
import PositionComponent from 'gameEngine/components/PositionComponent';
import UIComponent from 'gameEngine/components/UIComponent';
import {AnimationComp} from 'gameEngine/components/AnimationComp';
import {PossibleUIShapes, TILE_SIZE} from 'gameEngine/gameConstants';
import {getColRowByTileIdx} from '../utils/componentUtils/tileUtils/tileIdxUtils';

function getCenterPosOfTile(tileIdx: string) {
  let {col, row} = getColRowByTileIdx(tileIdx);

  return {
    x: col * TILE_SIZE + TILE_SIZE / 2,
    y: row * TILE_SIZE + TILE_SIZE / 2
  };
}

interface IShockWaveConstructor {
  x: number;
  y: number;
  radius?: number;
  fromTileIdx: string;
  toTileIdx: string;
  color?: string;
}

class ShockWave extends BaseEntity {
  constructor({x, y, radius = 16, fromTileIdx, toTileIdx, color = 'red'}: IShockWaveConstructor) {
    super();

    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new UIComponent([]));

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
    let animationDurationInTicks = 15;
    let i = 0;

    let sizeToGrow = 0.1;
    let radiusToGrow = 20;

    while (i < frameCount) {
      frames.push({
        shape: PossibleUIShapes.ARC_SHAPE,
        direction,
        size: 0.2 + (i * sizeToGrow) / frameCount,
        radius: 16 + (i * radiusToGrow) / frameCount,
        x: origin.x,
        y: origin.y,
        color
      });

      i++;
    }

    this.addComponent(
      new AnimationComp({
        SHOCKWAVE: {
          animationDurationInTicks, // each 'frame' takes this many
          frames,
          animationName: 'SHOCKWAVE',
          loops: false
        }
      })
    );

    this.addAnimationToRun(this.getPossibleAnimations().SHOCKWAVE);
  }

  /**
   * Shockwave is once-off animation, once the animation is done we remove the entire entity.
   * @param animationName
   */
  removeRunningAnimation(animationName: string) {
    this.destroy();
  }
}

export default ShockWave;
