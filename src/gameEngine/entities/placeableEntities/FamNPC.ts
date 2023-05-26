import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {CANVAS_OUTPUT} from '../../gameConstants';
import PlaceableEntity from './PlaceableEntity';
import {KillQuest} from '../Quest';
import HasUI from '../../components/HasUI';
import AssignsQuests from '../../components/AssignsQuests';

class FamNPC extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

    this.addComponent(new AssignsQuests([new KillQuest('CLEAR_CAMP')]));

    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: 'PLAYER_CHAR',
          data: {}
        }
      ])
    );
  }
}

export default FamNPC;
