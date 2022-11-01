import LevelComp from '../../components/LevelComp';
import playerAnimations from '../animations/playerAnimations';
import {AllowedUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import {ICharacterConfig, ICharacterInstanceAttr} from './ICharacterConfig';
import Character from './Character';
import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  LEVEL_COMP
} from '../../components/ComponentNamesConfig';
import UIComponent from '../../components/UIComponent';
import CharacterAttributesComponent from '../../components/CharacterAttributesComponent';
import CharacterSkillsComponent from '../../components/CharacterSkillsComponent';
import PlayerControlledComponent from '../../components/PlayerControlledComponent';
import ExperienceComp from '../../components/ExperienceComp';
import AnimationComp from '../../components/AnimationComp';

class Player extends Character {
  [EXPERIENCE_COMP]: ExperienceComp;
  [LEVEL_COMP]: LevelComp;
  [CHARACTER_SKILLS_COMP]: CharacterSkillsComponent;
  [CHARACTER_ATTRIBUTES_COMP]: CharacterAttributesComponent;
  constructor(instanceAttributes: ICharacterInstanceAttr, charConfig: ICharacterConfig) {
    super(instanceAttributes, charConfig);

    this.name = 'You';
    this.addComponent(new CharacterSkillsComponent());
    this.addComponent(new CharacterAttributesComponent());
    this.addComponent(new PlayerControlledComponent());
    this.addComponent(new ExperienceComp(1, 0));
    this.addComponent(
      new UIComponent([
        {
          name: CANVAS_OUTPUT,
          shape: AllowedUIShapes.PLAYER_CHAR,
          data: {}
        }
      ])
    );

    this.addComponent(new AnimationComp(playerAnimations));
  }
}

export default Player;
