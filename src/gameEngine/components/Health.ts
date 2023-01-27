import {HEALTH} from './_ComponentNames';

class Health {
  name: string;
  max: number;
  current: number;
  width: number;
  height: number;
  constructor(maxHealth: number, width: number, height: number) {
    this.name = HEALTH;
    this.max = maxHealth;
    this.current = maxHealth;
    this.width = width;
    this.height = height;
  }
}

export default Health;
