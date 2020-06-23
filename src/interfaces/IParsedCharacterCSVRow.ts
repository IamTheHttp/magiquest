import {CHARACTERS} from "gameConstants";
import {ATTACK_SPEEDS_OPTIONS} from "config";

export interface IParsedCharacterCSVRow {
  id: CHARACTERS,
  displayName: string;
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attackSpeed: ATTACK_SPEEDS_OPTIONS;
  radius: number;
  animationTypes: string;
}

export type IParsedCharacterCSVMap = {
  [CHARACTER in CHARACTERS]? : IParsedCharacterCSVRow
}