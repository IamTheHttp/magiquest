import {ATTACK_SPEEDS_OPTIONS} from "config";
import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";
import {IAnimationTypes} from "components/AnimationComp";

type ICharacterConfig = {
  dmg: number;
  health: number;
  speed: number;
  vision:number;
  attackSpeed: ATTACK_SPEEDS_OPTIONS;
  id: CHARACTERS;
  displayName: string;
  radius: 16;
  animationTypes: IAnimationTypes;
}

type ICharacterInstanceAttr = {
  col: number;
  row: number;
  characterLevel:number,
  spawningTileLocationID: AllowedLevelLocationIDs
}


export {ICharacterConfig, ICharacterInstanceAttr};