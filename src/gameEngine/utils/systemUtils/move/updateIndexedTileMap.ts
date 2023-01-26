import {getTileIdxByPos} from '../../componentUtils/tileUtils/tileIdxUtils';
import {IIndexedTileMap} from '../../../../interfaces/IGeneral';
import {BaseEntity} from '../../../BaseEntity';

interface updateMapTileIdxArguments {
  entity: BaseEntity;
  indexedTileMap: IIndexedTileMap;
  oldX?: number;
  oldY?: number;
  newX?: number;
  newY?: number;
}

function updateIndexedTileMap(updateArgs: updateMapTileIdxArguments) {
  const {
    entity,
    indexedTileMap,
    oldX = null, // Used to clear the old coordinates from existing entities
    oldY = null, // Used to clear the old coordinates from existing entities
    newX = null,
    newY = null
  } = updateArgs;

  const oldIndexedTile = indexedTileMap[getTileIdxByPos(oldX, oldY)];
  const newIndexedTile = indexedTileMap[getTileIdxByPos(newX, newY)];

  oldIndexedTile && oldIndexedTile.removeEnt(entity);
  newIndexedTile && newIndexedTile.addEnt(entity);
}

export {updateIndexedTileMap};
