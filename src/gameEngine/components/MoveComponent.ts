import {MOVEMENT_COMP} from './_ComponentNamesConfig';

class MoveComponent {
  name: string;
  speed: number;
  constructor(speed: number) {
    this.name = MOVEMENT_COMP;
    this.speed = speed;
  }
}

export default MoveComponent;
