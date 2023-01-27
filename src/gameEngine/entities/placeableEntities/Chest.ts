import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {PossibleUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import HasUI from '../../components/HasUI';
import PlaceableEntity from './PlaceableEntity';
import {Blocking} from '../../components/Blocking';

class Chest extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

    this.addComponent(new Blocking());
    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.CHEST_SHAPE,
          data: {}
        }
      ])
    );
  }
}

export default Chest;
