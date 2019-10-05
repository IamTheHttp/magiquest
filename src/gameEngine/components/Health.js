import {HEALTH_COMP} from './ComponentNamesConfig';

class Health {
  constructor(maxHealth) {
    this.name = HEALTH_COMP;
    this.max = maxHealth;
    this.current = maxHealth / 2;
  }
}

export default Health;