import LevelComp from '../../components/LevelComp';
import playerAnimations from '../animations/playerAnimations';
import {AllowedUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import PlaceableEntity from './PlaceableEntity';
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

class Player extends PlaceableEntity {
  [EXPERIENCE_COMP]: ExperienceComp;
  [LEVEL_COMP]: LevelComp;
  [CHARACTER_SKILLS_COMP]: CharacterSkillsComponent;
  [CHARACTER_ATTRIBUTES_COMP]: CharacterAttributesComponent;
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

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
