import {I_ALLOWED_ZONE_LOCATION_IDS, I_ATTACK_SPEED_OPTIONS, I_PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';
import {IAnimationDefinitionMap} from '../gameEngine/components/Animations';

type IPlaceableEntityData = {
  dmg: number;
  health: number;
  speedTilesPerSecond: number;
  vision: number;
  attackSpeed: I_ATTACK_SPEED_OPTIONS;
  id: I_PLACEABLE_ENTITIES;
  displayName: string;
  radius: number;
  possibleAnimationsForEntity?: IAnimationDefinitionMap;
};

type IPlacedEntityInstanceAttr = {
  col: number;
  row: number;
  entityLevel: number;
  // Used in the Quest system for "Kill all enemies in a location"
  spawningTileLocationID: I_ALLOWED_ZONE_LOCATION_IDS;
};

type IPlaceableEntityDataMap = {
  [PLACEABLE_ENTITY in I_PLACEABLE_ENTITIES]?: IPlaceableEntityData;
};

export {IPlaceableEntityData, IPlacedEntityInstanceAttr, IPlaceableEntityDataMap};
