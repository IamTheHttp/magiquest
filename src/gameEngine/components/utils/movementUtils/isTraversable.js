import {TRAVERSABLE_COMP} from '../../ComponentNamesConfig';
import {bit} from '../../../config';
import getTileIdx, {getTileIdxByPos} from '../tileUtils/getTileIdx';


function isTraversable(tileIdxMap, x, y) {
  let tileIdx = getTileIdxByPos(x, y);
  if (!tileIdxMap[tileIdx]) {
    return;
  }
  
  let indexedTile = tileIdxMap[tileIdx];
  
  if (indexedTile.getEntCount() > 0) {
    return false;
  }
  
  let {tile} = tileIdxMap[tileIdx];
  return tile && tile.hasComponents(TRAVERSABLE_COMP);
}

export default isTraversable;