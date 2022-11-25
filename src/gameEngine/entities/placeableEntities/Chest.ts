import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {AllowedUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import UIComponent from '../../components/UIComponent';
import PlaceableEntity from './PlaceableEntity';

class Chest extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, charConfig: IPlaceableEntityData) {
    super(instanceAttributes, charConfig);

    this.addComponent(
      new UIComponent([
        {
          name: CANVAS_OUTPUT,
          shape: AllowedUIShapes.CHEST_SHAPE,
          data: {}
        }
      ])
    );
  }
}

export default Chest;
