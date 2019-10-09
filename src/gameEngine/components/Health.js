import {HEALTH_COMP} from './ComponentNamesConfig';

class Health {
  constructor(maxHealth) {
    this.name = HEALTH_COMP;
    this.max = maxHealth;
    this.current = maxHealth;
  }
}

export default Health;