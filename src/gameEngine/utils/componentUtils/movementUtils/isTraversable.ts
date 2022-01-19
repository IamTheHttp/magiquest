import {TRAVERSABLE_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {getTileIdxByPos} from '../tileUtils/getTileIdx';
import {ITileIndexMap} from '../../../../interfaces/interfaces';
import {BaseEntity} from '../../../BaseEntity';

// is an x, y traversable for an entity
function isTraversable(tileIdxMap: ITileIndexMap, x: number, y: number, entity: BaseEntity) {
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
