import {TRAVERSABLE_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {getTileIdxByPos} from '../tileUtils/tileIdxUtils';
import {ITileIndexMap} from '../../../../interfaces/IGeneral';
import {BaseEntity} from '../../../BaseEntity';

// is an x, y traversable for an entity
function isTraversable(tileIdxMap: ITileIndexMap, x: number, y: number, entity: BaseEntity) {
  const tileIdx = getTileIdxByPos(x, y);
  const indexedTile = tileIdxMap[tileIdx];

  // TODO ItemDrops - we should only be checking for blocking entities, an item is still traversable
  if (indexedTile.getEntCount() > 0) {
    // someone is in this tile... but it's the {entity} that wants to move.
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
