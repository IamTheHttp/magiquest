import {ATTACK_SPEEDS_OPTIONS, CHARACTERS} from '../gameEngine/gameConstants';

export interface CharacterJSONData {
  id: CHARACTERS;
  displayName: string;
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attackSpeed: ATTACK_SPEEDS_OPTIONS;
  radius: number;
  animationTypes: string;
}

export type CharacterJSONDataMap = {
  [CHARACTER in CHARACTERS]?: CharacterJSONData;
};
