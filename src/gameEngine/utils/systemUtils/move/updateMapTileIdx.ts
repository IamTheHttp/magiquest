import {getTileIdxByPos} from '../../componentUtils/tileUtils/getTileIdx';
import {ITileIndexMap} from '../../../../interfaces/IGeneral';
import {BaseEntity} from '../../../BaseEntity';
import {HEALTH_COMP} from '../../../components/ComponentNamesConfig';

interface updateMapTileIdxArguments {
  entity: BaseEntity;
  tileIdxMap: ITileIndexMap;
  oldX?: number;
  oldY?: number;
  newX?: number;
  newY?: number;
}

function updateMapTileIdx({
  entity,
  tileIdxMap,
  oldX = null,
  oldY = null,
  newX = null,
  newY = null
}: updateMapTileIdxArguments) {
  // This was due to a bug that caused dead entities
  // that on the next tick needed to change tiles
  // to still move after being dead (since death is async by a tick.
  // TODO all systems actually operate on dead entities, they can still attack for example, this needs to be addressed
  // TODO - A dead Entity should probably not survive the tick...

  if (entity.hasComponents(HEALTH_COMP) && entity[HEALTH_COMP].current === 0) {
    return;
  }
  /**
   * @type IndexedTile
   */
  let oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
  let newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];

  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export default updateMapTileIdx;
