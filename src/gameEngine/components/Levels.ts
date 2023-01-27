import {LEVELS} from './_ComponentNames';

class Levels {
  name: string;
  entityLevel: number;
  constructor(entityLevel: number) {
    if (entityLevel <= 0) {
      throw 'Entity level has to be larger than 0';
    }
    this.name = LEVELS;
    this.entityLevel = entityLevel;
  }
}

export default Levels;
