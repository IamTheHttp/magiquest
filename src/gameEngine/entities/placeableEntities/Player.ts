import LevelComp from '../../components/LevelComp';
import {PossibleUIShapes, CANVAS_OUTPUT, TILE_SIZE} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import PlaceableEntity from './PlaceableEntity';
import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  HAS_INVENTORY,
  LEVEL_COMP
} from '../../components/_ComponentNamesConfig';
import HasUI from '../../components/HasUI';
import CharacterAttributesComponent from '../../components/CharacterAttributesComponent';
import CharacterSkillsComponent from '../../components/CharacterSkillsComponent';
import PlayerControlledComponent from '../../components/PlayerControlledComponent';
import ExperienceComp from '../../components/ExperienceComp';
import {HasInventory} from '../../components/HasInventory';
import {IsBlockingMovement} from '../../components/IsBlockingMovement';
import {CanPickupItems} from '../../components/CanPickupItems';

class Player extends PlaceableEntity {
  [EXPERIENCE_COMP]: ExperienceComp;
  [HAS_INVENTORY]: HasInventory;
  [LEVEL_COMP]: LevelComp;
  [CHARACTER_SKILLS_COMP]: CharacterSkillsComponent;
  [CHARACTER_ATTRIBUTES_COMP]: CharacterAttributesComponent;

  /**
   * See data/json files for placeableEntityData
   * @param instanceAttributes
   * @param placeableEntityData
   */
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);

    this.name = 'You';
    this.addComponent(new HasInventory());
    // Blocks movement on the map
    this.addComponent(new IsBlockingMovement());
    this.addComponent(new CanPickupItems());
    this.addComponent(new CharacterSkillsComponent());
    this.addComponent(new CharacterAttributesComponent());
    this.addComponent(new PlayerControlledComponent());
    this.addComponent(new ExperienceComp(1, 0));
    this.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.PLAYER_CHAR,
          data: {}
        }
      ])
    );
  }
}

export default Player;
