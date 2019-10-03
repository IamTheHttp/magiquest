import {POSITION} from '../../constants';

function filterOutFarEntities(systemArguments, mapAPI, entsToDraw) {
  let arr = [];
  let {panX, panY} = mapAPI.getPan();
  let {viewWidth, viewHeight} = systemArguments.viewSize;
  
  for (let i = 0; i < entsToDraw.length; i++) {
    let entity = entsToDraw[i];
    
    let {x, y, radius, height, width} = entity[POSITION];
    let entWidth = radius * 2 || width;
    let entHeight = radius * 2 || height;
    
    let xOutOfBound = x + entWidth < -panX || x - entWidth > -panX + viewWidth;
    let yOutOfBound = y + entHeight < -panY || y - entHeight > -panY + viewHeight;
    
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