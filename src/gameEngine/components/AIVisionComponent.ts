import {AI_VISION_COMP} from './_ComponentNamesConfig';

class AIVisionComponent {
  name: string;
  range: number;
  constructor(range: number) {
    this.name = AI_VISION_COMP;
    this.range = range;
  }
}

export default AIVisionComponent;
