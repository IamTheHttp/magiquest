import {getTileIdxByPos} from '../../componentUtils/tileUtils/getTileIdx';
import BaseEntity from "BaseEntity";
import {ITileIndexMap} from "../../../../interfaces/interfaces";

interface updateMapTileIdxArguments {
  entity: BaseEntity,
  tileIdxMap: ITileIndexMap,
  oldX?:number,
  oldY?:number,
  newX?:number,
  newY?:number
}

function updateMapTileIdx({entity, tileIdxMap,  oldX = null, oldY = null, newX = null, newY = null}: updateMapTileIdxArguments) {
  /**
   * @type IndexedTile
   */
  let oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
  let newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];
  
  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export default updateMapTileIdx;