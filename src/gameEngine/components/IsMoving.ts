import {IS_MOVING_COMP} from './ComponentNamesConfig';
import {DIRECTIONS_OPTIONS} from "gameConstants";

class IsMoving {
  name:string;
  direction:any;
  constructor() {
    this.name = IS_MOVING_COMP;
    this.direction = null;
  }
}

export default IsMoving;