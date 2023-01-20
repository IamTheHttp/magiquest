import {AllowedZoneLocationIDs, ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';
import {IAnimationDefinitionMap} from '../gameEngine/components/AnimationComp';

type IPlaceableEntityData = {
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attackSpeed: keyof typeof ATTACK_SPEEDS_OPTIONS;
  id: keyof typeof PLACEABLE_ENTITIES;
  displayName: string;
  radius: number;
  possibleAnimationsForEntity?: IAnimationDefinitionMap;
};

type IPlacedEntityInstanceAttr = {
  col: number;
  row: number;
  entityLevel: number;
  spawningTileLocationID: AllowedZoneLocationIDs; // Used in the Quest system for "Kill all enemies in a location"
};

type IPlaceableEntityDataMap = {
  [PLACEABLE_ENTITY in PLACEABLE_ENTITIES]?: IPlaceableEntityData;
};

export {IPlaceableEntityData, IPlacedEntityInstanceAttr, IPlaceableEntityDataMap};
