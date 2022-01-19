import {POSITION_COMP} from '../../components/ComponentNamesConfig';
import {ISystemArguments} from '../../../interfaces/gameloop.i';
import {BaseEntity} from '../../BaseEntity';
import {bit} from '../../gameConstants';

function filterOutFarEntities(systemArguments: ISystemArguments, entsToDraw: BaseEntity[]) {
  let buffer = bit * 8;
  let {mapAPI} = systemArguments;
  let arr = [];
  let {panX, panY} = mapAPI.getCurrentPanValue();
  let {viewWidth, viewHeight} = systemArguments.viewSize;

  for (let i = 0; i < entsToDraw.length; i++) {
    let entity = entsToDraw[i];
    let {x, y, radius, height, width} = entity[POSITION_COMP];
    let entWidth = radius * 2 || width;
    let entHeight = radius * 2 || height;

    // Example
    // We have -100x, which means we move our view screen 100px to the right (the underlying is translated -100 px)
    // x = 0;
    // ent is 50px wide
    // buffer is 0
    // x + width + buffer = 50px;
    // since our view only starts from x = 100, our entity is out of view
    let isEntityTooFarLeft = x + entWidth + buffer < -panX;
    // Same calculation, only we need to take into account the width of what we show (viewWidth).
    // If the entity's X is 'more to the right' than our current pan + the entire view, it's out of view.
    let isEntityTooFarRight = x - entWidth - buffer > -panX + viewWidth;
    let isEntityTooFarUp = y + entHeight + buffer < -panY;
    let isEntityTooFarDown = y - entHeight - buffer > -panY + viewHeight;

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
