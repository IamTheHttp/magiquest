import {IPlaceableEntityData, IPlacedEntityInstanceAttr} from '../../../interfaces/IPlaceableEntityData';
import {LEVEL_COMP, SPAWNED_COMP} from '../../components/ComponentNamesConfig';
import LevelComp from '../../components/LevelComp';
import AIControlledComp from '../../components/AIControlledComp';
import PlaceableEntity from './PlaceableEntity';
import SpawnedComponent from '../../components/SpawnedComponent';

class Enemy extends PlaceableEntity {
  [SPAWNED_COMP]: SpawnedComponent;
  [LEVEL_COMP]: LevelComp;
  constructor(instanceAttributes: IPlacedEntityInstanceAttr, placeableEntityData: IPlaceableEntityData) {
    super(instanceAttributes, placeableEntityData);
    let {col, row, entityLevel, spawningTileLocationID} = instanceAttributes;
    let {speed, health, radius, dmg, attackSpeed, vision, animationTypes, id, displayName} = placeableEntityData;

    this.addComponent(new SpawnedComponent(spawningTileLocationID));
    this.addComponent(new AIControlledComp());
  }
}

export default Enemy;
