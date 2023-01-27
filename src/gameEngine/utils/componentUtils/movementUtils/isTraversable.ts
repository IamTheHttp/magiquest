import {TRAVERSABLE} from 'gameEngine/components/_ComponentNames';
import {getTileIdxByPos} from '../tileUtils/tileIdxUtils';
import {IIndexedTileMap} from '../../../../interfaces/IGeneral';
import {BaseEntity} from '../../../BaseEntity';

// is an x, y traversable for an entity
function isTraversable(indexedTileMap: IIndexedTileMap, x: number, y: number, entity: BaseEntity) {
  const tileIdx = getTileIdxByPos(x, y);
  const indexedTile = indexedTileMap[tileIdx];

  return indexedTile.isTraversable(entity);
}

export default isTraversable;
