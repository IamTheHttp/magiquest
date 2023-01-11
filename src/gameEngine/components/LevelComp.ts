import {LEVEL_COMP} from './ComponentNamesConfig';

class LevelComp {
  name: string;
  entityLEvel: number;
  constructor(entityLevel: number) {
    if (entityLevel <= 0) {
      throw 'Entity level has to be larger than 0';
    }
    this.name = LEVEL_COMP;
    this.entityLEvel = entityLevel;
  }
}

export default LevelComp;
