import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {PossibleUIShapes, CANVAS_OUTPUT, AllowedZoneLocationIDs} from '../../gameConstants';
import UIComponent from '../../components/UIComponent';
import PlaceableEntity from './PlaceableEntity';

/**
 * An entity that represents a weapon that can be found on the ground
 */
export class ItemEntity extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityConfig: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityConfig);

    this.addComponent(
      new UIComponent([
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
  new ItemEntity(
    {
      col,
      row,
      entityLevel: 1,
      spawningTileLocationID: null
    },
    {
      radius: 16,
      health: 0,
      displayName: 'wtf',
      attackSpeed: 'SLOW',
      dmg: 1,
      animationTypes: null,
      speed: null,
      vision: 0,
      id: 'ITEM'
    }
  );
}
