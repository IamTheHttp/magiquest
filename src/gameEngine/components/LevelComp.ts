import {LEVEL_COMP} from './ComponentNamesConfig';

class LevelComp {
  name: string;
  characterLevel: number;
  constructor(characterLevel: number) {
    if (characterLevel <= 0) {
      throw 'Character level has to be larger than 0';
    }
    this.name = LEVEL_COMP;
    this.characterLevel = characterLevel;
  }
}

export default LevelComp;
