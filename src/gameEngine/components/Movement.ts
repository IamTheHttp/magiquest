import {MOVEMENT} from './_ComponentNames';

class Movement {
  name: string;
  speed: number;
  constructor(speed: number) {
    this.name = MOVEMENT;
    this.speed = speed;
  }
}

export default Movement;
