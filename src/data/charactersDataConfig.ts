import {ICharacterConfig} from '../gameEngine/entities/characters/ICharacterConfig';
import playerAnimations from '../gameEngine/entities/animations/playerAnimations';
import enemyAnimations from '../gameEngine/entities/animations/enemyAnimations';
import {CHARACTERS} from '../gameEngine/gameConstants';

// TODO Rename CharacterData to something else
import CharacterData from '../data/characters.json';

type ICharsConfig = {
  [CHARACTER in CHARACTERS]?: ICharacterConfig;
};

let charactersDataConfig: ICharsConfig = {};

Object.keys(CharacterData).forEach((char: CHARACTERS) => {
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
