import {CHARACTERS} from "gameConstants";
import {ATTACK_SPEEDS_OPTIONS} from "../gameEngine/config";
import enemyAnimations from "entities/animations/enemyAnimations";
import {ICharacterConfig} from "entities/characters/ICharacterConfig";
import playerAnimations from "entities/animations/playerAnimations";

type ICharsConfig = {
  [CHARACTER in CHARACTERS]: ICharacterConfig
}

let charactersDataConfig: ICharsConfig = {
  [CHARACTERS.PLAYER]: {
    id: CHARACTERS.PLAYER,
    displayName: 'The Amazing Player',
    dmg: 250,
    health: 500,
    speed: 4,
    vision:0,
    attackSpeed: ATTACK_SPEEDS_OPTIONS.FASTEST,
    radius:16,
    animationTypes: playerAnimations
  },
  [CHARACTERS.CHEST]: {
    id: CHARACTERS.CHEST,
    displayName: 'The Amazing Chest',
    dmg: 0,
    health: 20,
    speed: 0,
    vision:0,
    attackSpeed: null,
    radius:16,
    animationTypes: null
  },
  [CHARACTERS.FAM_NPC]: {
    id: CHARACTERS.FAM_NPC,
    displayName: 'The Amazing FamNPC',
    dmg: 0,
    health: 0,
    speed: 0,
    vision:0,
    attackSpeed: null,
    radius:16,
    animationTypes: null
  },
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