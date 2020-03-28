import {AllowedLevelLocationIDs, AllowedQuestIDs, CHARACTERS} from "gameConstants";
import {ATTACK_SPEEDS_OPTIONS} from "../gameEngine/config";
import enemyAnimations from "entities/animations/enemyAnimations";
import {IAnimationTypes} from "components/AnimationComp";

export type ICharacterConfig = {
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

type ICharsConfig = {
  [CHARACTER in CHARACTERS]: ICharacterConfig
}

let charactersDataConfig: ICharsConfig = {
  [CHARACTERS.PLAYER]: null,
  [CHARACTERS.CHEST]: null,
  [CHARACTERS.FAM_NPC]: null,
  [CHARACTERS.DEMON]: {
    id: CHARACTERS.DEMON,
    displayName: 'The Amazing GENERIC DEMON',
    dmg: 20,
    health: 100,
    speed: 4,
    vision:200,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
    radius:16,
    animationTypes: enemyAnimations
  },
  [CHARACTERS.ENEMY]: {
    id: CHARACTERS.ENEMY,
    displayName: 'The Amazing GENERIC ENEMY',
    dmg: 20,
    health: 1000,
    speed: 4,
    vision:200,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
    radius:16,
    animationTypes: enemyAnimations
  },
  [CHARACTERS.GARGOYLE]: {
    id: CHARACTERS.GARGOYLE,
    displayName: 'The Amazing GARGOYLE',
    dmg: 20,
    health: 100,
    speed: 4,
    vision:200,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
    radius:16,
    animationTypes: enemyAnimations
  },
  [CHARACTERS.VAMPIRE]: {
    id: CHARACTERS.VAMPIRE,
    displayName: 'The Amazing Vampire',
    dmg: 20,
    health: 100,
    speed: 1,
    vision:200,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
    radius:16,
    animationTypes: enemyAnimations
  },
  [CHARACTERS.IMP]: {
    id: CHARACTERS.IMP,
    displayName: 'The Amazing Imp',
    dmg: 20,
    health: 100,
    speed: 2,
    vision:200,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FAST,
    radius:16,
    animationTypes: enemyAnimations
  }
};


export default charactersDataConfig;