import UIComponent from '../../components/UIComponent';
import PlayerControlledComponent from '../../components/PlayerControlledComponent';
import {ANIMATIONS, CANVAS_OUTPUT, AllowedUIShapes, AllowedQuestIDs} from 'gameConstants';
import AnimationComp from 'components/AnimationComp';
import playerAnimations from 'entities/animations/playerAnimations';
import {EXPERIENCE_COMP, LEVEL_COMP} from "components/ComponentNamesConfig";
import ExperienceComp from "components/ExperienceComp";
import LevelComp from "components/LevelComp";
import Character from "entities/characters/Character";
import {ICharacterConfig, ICharacterInstanceAttr} from "entities/characters/ICharacterConfig";

class Player extends Character {
  [EXPERIENCE_COMP]: ExperienceComp;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig:ICharacterConfig) {
    super(instanceAttributes, charConfig);

    this.addComponent(new PlayerControlledComponent());
    this.addComponent(new ExperienceComp());
    this.addComponent(new UIComponent([
      {
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.PLAYER_CHAR,
        data: {}
      },
      {
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.HEALTH_BAR_SHAPE,
        data: {}
      }]
    ));

    this.addComponent(new AnimationComp(playerAnimations));
  }
}

export default Player;