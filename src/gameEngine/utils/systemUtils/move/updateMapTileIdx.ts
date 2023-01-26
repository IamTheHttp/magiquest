import {getTileIdxByPos} from '../../componentUtils/tileUtils/tileIdxUtils';
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

function updateMapTileIdx(updateArgs: updateMapTileIdxArguments) {
  const {
    entity,
    tileIdxMap,
    oldX = null, // Used to clear the old coordinates from existing entities
    oldY = null, // Used to clear the old coordinates from existing entities
    newX = null,
    newY = null
  } = updateArgs;

  let oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
  let newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];

  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export default updateMapTileIdx;
