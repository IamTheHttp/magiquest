/**
 * Created by patrik.tolosa on 2019-10-23.

 */
import {BaseEntity} from 'gameEngine/BaseEntity';
import Position from 'gameEngine/components/Position';
import HasUI from 'gameEngine/components/HasUI';
import {Animations} from 'gameEngine/components/Animations';
import {PossibleUIShapes, TILE_SIZE} from 'gameEngine/gameConstants';
import {getColRowByTileIdx} from '../utils/componentUtils/tileUtils/tileIdxUtils';

function getCenterPosOfTile(tileIdx: string) {
  const {col, row} = getColRowByTileIdx(tileIdx);

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
  constructor({x, y, radius = TILE_SIZE / 2, fromTileIdx, toTileIdx, color = 'red'}: IShockWaveConstructor) {
    super();

    this.addComponent(new Position({x, y, radius}));
    this.addComponent(new HasUI([]));

    const origin = getCenterPosOfTile(fromTileIdx);
    const target = getCenterPosOfTile(toTileIdx);
    const deltaX = target.x - origin.x;
    const deltaY = target.y - origin.y;
    let direction;

    if (deltaX === 0) {
      direction = deltaY > 0 ? 0.5 : -0.5;
    } else if (deltaY === 0) {
      direction = deltaX > 0 ? 0 : 1;
    } else {
      direction = Math.atan(deltaY / deltaX);
    }

    const frames = [];
    const frameCount = 15;
    const animationDurationInTicks = 15;
    let i = 0;

    const sizeToGrow = 0.1;
    const radiusToGrow = 20;

    while (i < frameCount) {
      frames.push({
        shape: PossibleUIShapes.ARC_SHAPE,
        direction,
        size: 0.2 + (i * sizeToGrow) / frameCount,
        radius: TILE_SIZE / 2 + (i * radiusToGrow) / frameCount,
        x: origin.x,
        y: origin.y,
        color
      });

      i++;
    }

    this.addComponent(
      new Animations({
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
