import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {PossibleUIShapes, CANVAS_OUTPUT, AllowedZoneLocationIDs, TILE_SIZE} from '../../gameConstants';
import HasUI from '../../components/HasUI';
import PlaceableEntity from './PlaceableEntity';
import {Stackable} from '../../components/Stackable';

/**
 * An entity that represents a weapon that can be found on the ground
 */
export class ItemEntity extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

    this.addComponent(new Stackable());
    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          // Hardcoded weapon shape, but in the future we can easily
          shape: PossibleUIShapes.DROPPED_ITEM_SHAPE,
          data: {
            spriteName: 'GENERIC_ITEM' // TODO
          }
        }
      ])
    );
  }
}

export function dropNewItem({col, row}: {col: number; row: number}) {
  return new ItemEntity(
    {
      col,
      row,
      entityLevel: 1,
      spawningTileLocationID: null
    },
    {
      radius: TILE_SIZE / 2,
      health: 0,
      displayName: 'wtf',
      attackSpeed: 'SLOW',
      dmg: 1,
      speed: null,
      vision: 0,
      id: 'ITEM'
    }
  );
}
