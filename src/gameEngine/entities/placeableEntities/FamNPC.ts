import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {AllowedQuestIDs, AllowedUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import PlaceableEntity from './PlaceableEntity';
import {KillQuest} from '../Quest';
import UIComponent from '../../components/UIComponent';
import CanAssignQuestsComponent from '../../components/CanAssignQuestsComponent';

class FamNPC extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

    this.addComponent(new CanAssignQuestsComponent([new KillQuest(AllowedQuestIDs.CLEAR_CAMP)]));

    this.addComponent(
      new UIComponent([
        {
          name: CANVAS_OUTPUT,
          shape: AllowedUIShapes.PLAYER_CHAR,
          data: {}
        }
      ])
    );
  }
}

export default FamNPC;
