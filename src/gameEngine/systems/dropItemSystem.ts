import {ISystemArguments} from '../../interfaces/IGameLoop';
import {dropNewItem, ItemEntity} from '../entities/placeableEntities/Item';
import {getColRowByEntity, getTileIdxByEnt} from '../utils/componentUtils/tileUtils/tileIdxUtils';
import {updateIndexedTileMap} from '../utils/systemUtils/move/updateIndexedTileMap';

/**
 * dropItemSystem
 * Drop an item from a destroyedEntity
 */
export function dropItemSystem(systemArguments: ISystemArguments) {
  let {destroyedPlaceableEntities, indexedTileMap} = systemArguments;

  destroyedPlaceableEntities.forEach((ent) => {
    const {col, row} = getColRowByEntity(ent);
    const itemEntity = dropNewItem({col, row});

    updateIndexedTileMap({
      indexedTileMap: indexedTileMap,
      entity: itemEntity,
      newX: itemEntity.getPos().x,
      newY: itemEntity.getPos().y,
      oldX: null,
      oldY: null
    });
  });
}
