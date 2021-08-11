import {ICharacterConfig, ICharacterInstanceAttr} from "./ICharacterConfig";
import {AllowedUIShapes, CANVAS_OUTPUT} from "../../gameConstants";
import Character from "./Character";
import UIComponent from "../../components/UIComponent";

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

