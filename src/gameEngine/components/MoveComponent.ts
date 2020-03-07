import {MOVEMENT_COMP} from './ComponentNamesConfig';

class MoveComponent {
  name:string;
  speed:any; // TODO this should not be any
  constructor(speed: number) {
    this.name = MOVEMENT_COMP;
    this.speed = speed;
  }
}

export default MoveComponent;
