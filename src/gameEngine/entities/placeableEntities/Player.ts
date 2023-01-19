import LevelComp from '../../components/LevelComp';
import {PossibleUIShapes, CANVAS_OUTPUT} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import PlaceableEntity from './PlaceableEntity';
import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  INVENTORY_COMP,
  LEVEL_COMP
} from '../../components/ComponentNamesConfig';
import UIComponent from '../../components/UIComponent';
import CharacterAttributesComponent from '../../components/CharacterAttributesComponent';
import CharacterSkillsComponent from '../../components/CharacterSkillsComponent';
import PlayerControlledComponent from '../../components/PlayerControlledComponent';
import ExperienceComp from '../../components/ExperienceComp';
import {InventoryComponent} from '../../components/Inventory';
import {GENERIC_WEAPON} from '../../classes/Item';
import {ItemEntity} from './Item';

class Player extends PlaceableEntity {
  [EXPERIENCE_COMP]: ExperienceComp;
  [INVENTORY_COMP]: InventoryComponent;
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
    this.addComponent(new InventoryComponent());

    // TODO remove from here.
    this[INVENTORY_COMP].equipWeapon(new GENERIC_WEAPON());
    this[INVENTORY_COMP].addItemToBackpack(new GENERIC_WEAPON());

    // TODO Remove this from here, this is for testing the dropped item mechanic
    new ItemEntity(
      {
        col: instanceAttributes.col + 1,
        row: instanceAttributes.row + 1,
        entityLevel: 1,
        spawningTileLocationID: null
      },
      {
        dmg: 0,
        animationTypes: null,
        attackSpeed: null,
        displayName: null,
        health: null,
        radius: 16,
        speed: 0,
        vision: 0,
        id: 'ITEM'
      }
    );

    new ItemEntity(
      {
        col: instanceAttributes.col + 1,
        row: instanceAttributes.row + 1,
        entityLevel: 1,
        spawningTileLocationID: null
      },
      {
        dmg: 0,
        animationTypes: null,
        attackSpeed: null,
        displayName: null,
        health: null,
        radius: 16,
        speed: 0,
        vision: 0,
        id: 'ITEM'
      }
    );

    this.addComponent(new CharacterSkillsComponent());
    this.addComponent(new CharacterAttributesComponent());
    this.addComponent(new PlayerControlledComponent());
    this.addComponent(new ExperienceComp(1, 0));
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

export default Player;
