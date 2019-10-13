import {TRAVERSABLE_COMP} from 'ComponentNamesConfig';
import {bit} from 'gameEngine/config';
import getTileIdx, {getTileIdxByPos} from '../tileUtils/getTileIdx';

// is an x, y traversable for an entity
function isTraversable(tileIdxMap, x, y, entity) {
  let tileIdx = getTileIdxByPos(x, y);
  if (!tileIdxMap[tileIdx]) {
    return;
  }
  
  let indexedTile = tileIdxMap[tileIdx];
  
  if (indexedTile.getEntCount() > 0) {
    // someone is in this tile.. but it's me..
    if (indexedTile.entities[entity.id] && indexedTile.getEntCount() === 1) {
      // do nothing, this is okay
    } else {
      return false;
    }
  }
  
  let {tile} = tileIdxMap[tileIdx];
  return tile && tile.hasComponents(TRAVERSABLE_COMP);
}

export default isTraversable;