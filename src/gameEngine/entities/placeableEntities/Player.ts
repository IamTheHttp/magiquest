import Levels from '../../components/Levels';
import {PossibleUIShapes, CANVAS_OUTPUT, TILE_SIZE} from '../../gameConstants';
import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import PlaceableEntity from './PlaceableEntity';
import {ATTRIBUTES, SKILLS, EXPERIENCE, INVENTORY, LEVELS} from '../../components/_ComponentNames';
import HasUI from '../../components/HasUI';
import Attributes from '../../components/Attributes';
import Skills from '../../components/Skills';
import PlayerControlled from '../../components/PlayerControlled';
import Experience from '../../components/Experience';
import {HasInventory} from '../../components/HasInventory';
import {Blocking} from '../../components/Blocking';
import {ItemPickup} from '../../components/ItemPickup';

class Player extends PlaceableEntity {
  [EXPERIENCE]: Experience;
  [INVENTORY]: HasInventory;
  [LEVELS]: Levels;
  [SKILLS]: Skills;
  [ATTRIBUTES]: Attributes;

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
    this.addComponent(new Blocking());
    this.addComponent(new ItemPickup());
    this.addComponent(new Skills());
    this.addComponent(new Attributes());
    this.addComponent(new PlayerControlled());
    this.addComponent(new Experience(1, 0));
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
