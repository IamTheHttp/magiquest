import {IAnimationTypes} from "../../components/AnimationComp";
import {AllowedLevelLocationIDs, ATTACK_SPEEDS_OPTIONS, CHARACTERS} from "../../gameConstants";

type ICharacterConfig = {
  dmg: number;
  health: number;
  speed: number;
  vision:number;
  attackSpeed: ATTACK_SPEEDS_OPTIONS;
  id: CHARACTERS;
  displayName: string;
  radius: number; // for now everyone uses 16
  animationTypes: IAnimationTypes;
}

type ICharacterInstanceAttr = {
  col: number;
  row: number;
  characterLevel:number,
  spawningTileLocationID: AllowedLevelLocationIDs
}


export {ICharacterConfig, ICharacterInstanceAttr};