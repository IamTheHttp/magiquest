import {POSITION} from '../../components/_ComponentNames';
import {ISystemArguments} from '../../../interfaces/IGameLoop';
import {BaseEntity} from '../../BaseEntity';
import {TILE_SIZE} from '../../gameConstants';

function filterOutFarEntities(systemArguments: ISystemArguments, entsToDraw: BaseEntity[]) {
  const buffer = TILE_SIZE * 8;
  const {mapAPI} = systemArguments;
  const arr = [];
  const {panX, panY} = mapAPI.getCurrentPanValue();
  const {viewWidth, viewHeight} = systemArguments.viewSize;

  for (let i = 0; i < entsToDraw.length; i++) {
    const entity = entsToDraw[i];
    const {x, y, radius, height, width, isFixedToViewPort} = entity[POSITION];

    // If an entity is fixed to the viewport, it should never be filtered out.
    if (isFixedToViewPort) {
      arr.push(entity);
      continue;
    }

    const entWidth = radius * 2 || width;
    const entHeight = radius * 2 || height;

    // Example
    // We have -100x, which means we move our view screen 100px to the right (the underlying is translated -100 px)
    // x = 0;
    // ent is 50px wide
    // buffer is 0
    // x + width + buffer = 50px;
    // since our view only starts from x = 100, our entity is out of view
    const isEntityTooFarLeft = x + entWidth + buffer < -panX;
    // Same calculation, only we need to take into account the width of what we show (viewWidth).
    // If the entity's X is 'more to the right' than our current pan + the entire view, it's out of view.
    const isEntityTooFarRight = x - entWidth - buffer > -panX + viewWidth;
    const isEntityTooFarUp = y + entHeight + buffer < -panY;
    const isEntityTooFarDown = y - entHeight - buffer > -panY + viewHeight;

    // is out of screen?
    if (isEntityTooFarLeft || isEntityTooFarRight || isEntityTooFarUp || isEntityTooFarDown) {
      // do nothing
    } else {
      arr.push(entity);
    }
  }

  return arr;
}

export default filterOutFarEntities;
