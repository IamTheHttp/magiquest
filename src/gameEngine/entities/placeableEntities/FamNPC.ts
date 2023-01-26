import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {AllowedQuestIDs, PossibleUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import PlaceableEntity from './PlaceableEntity';
import {KillQuest} from '../Quest';
import UIComponent from '../../components/UIComponent';
import CanAssignQuests from '../../components/CanAssignQuests';

class FamNPC extends PlaceableEntity {
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

    this.addComponent(new CanAssignQuests([new KillQuest(AllowedQuestIDs.CLEAR_CAMP)]));

    this.addComponent(
      new UIComponent([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.PLAYER_CHAR,
          data: {}
        }
      ])
    );
  }
}

export default FamNPC;
