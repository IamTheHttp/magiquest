import {getTileIdxByPos} from '../../componentUtils/tileUtils/getTileIdx';

function updateMapTileIdx({entity, tileIdxMap,  oldX = null, oldY = null, newX = null, newY = null}) {
  /**
   * @type IndexedTile
   */
  let oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
  let newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];
  
  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export default updateMapTileIdx;