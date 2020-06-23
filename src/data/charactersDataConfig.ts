import {CHARACTERS} from "gameConstants";
import {ATTACK_SPEEDS_OPTIONS} from "config";
import enemyAnimations from "entities/animations/enemyAnimations";
import {ICharacterConfig} from "entities/characters/ICharacterConfig";
import playerAnimations from "entities/animations/playerAnimations";
import CharacterData from "../data/characters.json";


type ICharsConfig = {
  [CHARACTER in CHARACTERS]?: ICharacterConfig
}



let charactersDataConfig: ICharsConfig = {};


//
Object.keys(CharacterData).forEach((char:CHARACTERS) => {
  let animations = null;
  if (CharacterData[char].animationTypes === 'PLAYER_ANIMATION') {
    animations = playerAnimations;
  } else if (CharacterData[char].animationTypes === 'ENEMY_ANIMATION') {
    animations = enemyAnimations;
  } else {
    // nothing, stay null
  }

  charactersDataConfig[char] = {
    ...CharacterData[char],
    animationTypes: animations
  };
});


export default charactersDataConfig;