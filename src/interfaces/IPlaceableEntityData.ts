import {IAnimationTypes} from '../gameEngine/components/AnimationComp';
import {AllowedZoneLocationIDs, ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';

type IPlaceableEntityData = {
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attackSpeed: keyof typeof ATTACK_SPEEDS_OPTIONS;
  id: keyof typeof PLACEABLE_ENTITIES;
  displayName: string;
  radius: number; // for now everyone uses 16

  // Note: in JSON, this is a string, but in this object type animationTypes is an object
  animationTypes: IAnimationTypes;
};

type IPlacedEntityInstanceAttr = {
  col: number;
  row: number;
  characterLevel: number;
  spawningTileLocationID: AllowedZoneLocationIDs;
};

type IPlaceableEntityDataMap = {
  [PLACEABLE_ENTITY in PLACEABLE_ENTITIES]?: IPlaceableEntityData;
};

export {IPlaceableEntityData, IPlacedEntityInstanceAttr, IPlaceableEntityDataMap};
