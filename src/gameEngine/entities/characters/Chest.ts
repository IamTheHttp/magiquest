import UIComponent from '../../components/UIComponent';
import {AllowedUIShapes, CANVAS_OUTPUT} from 'gameConstants';
import {ICharacterConfig, ICharacterInstanceAttr} from "entities/characters/ICharacterConfig";
import Character from "entities/characters/Character";

class Chest extends Character {
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig:ICharacterConfig) {
    super(instanceAttributes, charConfig);

    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.CHEST_SHAPE,
        data: {}
      }]
    ));
  }
}

export default Chest;

