import {MOVEMENT_COMP} from 'gameEngine/constants';
class MoveComponent {
  constructor(speed) {
    this.name = MOVEMENT_COMP;
    this.speed = speed;
  }
}

export default MoveComponent;
