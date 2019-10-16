import {POSITION_COMP} from '../../components/ComponentNamesConfig';
import {bit} from '../../config';

function filterOutFarEntities(systemArguments, entsToDraw) {
  let buffer = bit * 8;
  let {mapAPI} = systemArguments;
  let arr = [];
  let {panX, panY} = mapAPI.getPan();
  let {viewWidth, viewHeight} = systemArguments.viewSize;
  
  for (let i = 0; i < entsToDraw.length; i++) {
    let entity = entsToDraw[i];
    
    let {x, y, radius, height, width} = entity[POSITION_COMP];
    let entWidth = radius * 2 || width;
    let entHeight = radius * 2 || height;
    
    // TODO - Can we make it easier to understand?
    let xOutOfBound = x + entWidth + buffer < -panX || x - entWidth - buffer > -panX + viewWidth;
    let yOutOfBound = y + entHeight + buffer < -panY || y - entHeight - buffer > -panY + viewHeight;
    
    // out of screen? do nothing
    if (xOutOfBound || yOutOfBound) {
      // do nothing
    } else {
      arr.push(entity);
    }
  }
  
  return arr;
}

export default filterOutFarEntities;