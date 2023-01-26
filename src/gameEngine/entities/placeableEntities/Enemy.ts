import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {LEVEL_COMP, SPAWNED_COMP} from '../../components/_ComponentNamesConfig';
import LevelComp from '../../components/LevelComp';
import AIControlledComp from '../../components/AIControlledComp';
import PlaceableEntity from './PlaceableEntity';
import SpawnedComponent from '../../components/SpawnedComponent';
import {IsBlockingMovement} from '../../components/IsBlockingMovement';

class Enemy extends PlaceableEntity {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);
    let {col, row, entityLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, possibleAnimationsForEntity, id, displayName} =
      placeableEntityData;

    this.addComponent(new SpawnedComponent(spawningTileLocationID));
    this.addComponent(new AIControlledComp());
    // Blocks movement on the map
    this.addComponent(new IsBlockingMovement());
  }
}

export default Enemy;
