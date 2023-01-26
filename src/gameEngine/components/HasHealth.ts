import {HAS_HEALTH} from './_ComponentNamesConfig';

class HasHealth {
  name: string;
  max: number;
  current: number;
  width: number;
  height: number;
  constructor(maxHealth: number, width: number, height: number) {
    this.name = HAS_HEALTH;
    this.max = maxHealth;
    this.current = maxHealth;
    this.width = width;
    this.height = height;
  }
}

export default HasHealth;
