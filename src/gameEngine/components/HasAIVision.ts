import {HAS_AI_VISION} from './_ComponentNamesConfig';

class HasAIVision {
  name: string;
  range: number;
  constructor(range: number) {
    this.name = HAS_AI_VISION;
    this.range = range;
  }
}

export default HasAIVision;
