import {ISystemArguments} from '../../interfaces/IGameLoop';
import {dropNewItem} from '../entities/placeableEntities/Item';
import {getColRowByEntity} from '../utils/componentUtils/tileUtils/tileIdxUtils';
import {updateIndexedTileMap} from '../utils/systemUtils/move/updateIndexedTileMap';

/**
 * dropItemSystem
 * Drop an item from a destroyedEntity
 */
export function dropItemSystem(systemArguments: ISystemArguments) {
  const {destroyedPlaceableEntities, indexedTileMap} = systemArguments;

  destroyedPlaceableEntities.forEach((ent) => {
    const {col, row} = getColRowByEntity(ent);
    const itemEntity = dropNewItem({col, row});

    updateIndexedTileMap({
      indexedTileMap,
      entity: itemEntity,
      newX: itemEntity.getPos().x,
      newY: itemEntity.getPos().y,
      oldX: null,
      oldY: null
    });
  });
}
