import UIComponent from '../../components/UIComponent';
import {AllowedQuestIDs, AllowedUIShapes, CANVAS_OUTPUT} from 'gameEngine//gameConstants';
import CanAssignQuestsComponent from "components/CanAssignQuestsComponent";
import {KillQuest} from "entities/Quest";
import Character from "entities/characters/Character";
import {ICharacterConfig, ICharacterInstanceAttr} from "entities/characters/ICharacterConfig";

class FamNPC extends Character {
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig:ICharacterConfig) {
    super(instanceAttributes, charConfig);

    this.addComponent(new CanAssignQuestsComponent([
      new KillQuest(AllowedQuestIDs.CLEAR_CAMP)
    ]));

    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.PLAYER_CHAR,
        data: {}
      }]
    ));
  }
}

export default FamNPC;