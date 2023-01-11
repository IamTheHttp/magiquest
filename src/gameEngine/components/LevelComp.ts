import {LEVEL_COMP} from './ComponentNamesConfig';

class LevelComp {
  name: string;
  entityLevel: number;
  constructor(entityLevel: number) {
    if (entityLevel <= 0) {
      throw 'Entity level has to be larger than 0';
    }
    this.name = LEVEL_COMP;
    this.entityLevel = entityLevel;
  }
}

export default LevelComp;
