import {AI_VISION_COMP} from './ComponentNamesConfig';

class AIVisionComponent {
  name: string;
  range: any;
  constructor(range) {
    this.name = AI_VISION_COMP;
    this.range = range;
  }
}

export default AIVisionComponent;