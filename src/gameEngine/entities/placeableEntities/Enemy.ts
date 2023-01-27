import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {LEVELS, WAS_SPAWNED} from '../../components/_ComponentNames';
import Levels from '../../components/Levels';
import {ControlledByAI} from '../../components/ControlledByAI';
import PlaceableEntity from './PlaceableEntity';
import WasSpawned from '../../components/WasSpawned';
import {Blocking} from '../../components/Blocking';

class Enemy extends PlaceableEntity {
  [WAS_SPAWNED]: WasSpawned;
  [LEVELS]: Levels;
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);
    let {col, row, entityLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, possibleAnimationsForEntity, id, displayName} =
      placeableEntityData;

    this.addComponent(new WasSpawned(spawningTileLocationID));
    this.addComponent(new ControlledByAI());
    // Blocks movement on the map
    this.addComponent(new Blocking());
  }
}

export default Enemy;
