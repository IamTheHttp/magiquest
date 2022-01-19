import {ICharacterConfig, ICharacterInstanceAttr} from './ICharacterConfig';
import {AllowedQuestIDs, AllowedUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import Character from './Character';
import {KillQuest} from '../Quest';
import UIComponent from '../../components/UIComponent';
import CanAssignQuestsComponent from '../../components/CanAssignQuestsComponent';

class FamNPC extends Character {
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig: ICharacterConfig) {
    super(instanceAttributes, charConfig);

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
