import {MOVEMENT_COMP} from './ComponentNamesConfig';

class MoveComponent {
  name:string;
  speed:any;
  constructor(speed) {
    this.name = MOVEMENT_COMP;
    this.speed = speed;
  }
}

export default MoveComponent;
