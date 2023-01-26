import {HEALTH_COMP} from './_ComponentNamesConfig';

class Health {
  name: string;
  max: number;
  current: number;
  width: number;
  height: number;
  constructor(maxHealth: number, width: number, height: number) {
    this.name = HEALTH_COMP;
    this.max = maxHealth;
    this.current = maxHealth;
    this.width = width;
    this.height = height;
  }
}

export default Health;
