import {ISystemArguments} from '../../interfaces/IGameLoop';
import {dropNewItem, ItemEntity} from '../entities/placeableEntities/Item';
import {getColRowByEntity, getTileIdxByEnt} from '../utils/componentUtils/tileUtils/tileIdxUtils';

/**
 * dropItemSystem
 * Drop an item from a destroyedEntity
 */
export function dropItemSystem(systemArguments: ISystemArguments) {
  let {destroyedPlaceableEntities} = systemArguments;

  destroyedPlaceableEntities.forEach((ent) => {
    const {col, row} = getColRowByEntity(ent);
    dropNewItem({col, row});
  });
}
