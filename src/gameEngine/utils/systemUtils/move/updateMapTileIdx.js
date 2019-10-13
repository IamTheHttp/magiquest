import {getTileIdxByPos} from '../../componentUtils/tileUtils/getTileIdx';

function updateMapTileIdx({entity, tileIdxMap,  oldX, oldY, newX, newY}) {
  let oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
  let newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];
  
  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export default updateMapTileIdx;