import {I_ALLOWED_ZONE_LOCATION_IDS, I_ATTACK_SPEED_OPTIONS, PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';
import {IAnimationDefinitionMap} from '../gameEngine/components/Animations';

type IPlaceableEntityData = {
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attackSpeed: I_ATTACK_SPEED_OPTIONS;
  id: keyof typeof PLACEABLE_ENTITIES;
  displayName: string;
  radius: number;
  possibleAnimationsForEntity?: IAnimationDefinitionMap;
};

type IPlacedEntityInstanceAttr = {
  col: number;
  row: number;
  entityLevel: number;
  spawningTileLocationID: I_ALLOWED_ZONE_LOCATION_IDS; // Used in the Quest system for "Kill all enemies in a location"
};

type IPlaceableEntityDataMap = {
  [PLACEABLE_ENTITY in PLACEABLE_ENTITIES]?: IPlaceableEntityData;
};

export {IPlaceableEntityData, IPlacedEntityInstanceAttr, IPlaceableEntityDataMap};
