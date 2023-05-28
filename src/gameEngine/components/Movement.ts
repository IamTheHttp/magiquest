import {MOVEMENT} from './_ComponentNames';

class Movement {
  name: string;
  speedTilesPerSecond: number;
  constructor(speedTilesPerSecond: number) {
    this.name = MOVEMENT;
    this.speedTilesPerSecond = speedTilesPerSecond;
  }
}

export default Movement;
