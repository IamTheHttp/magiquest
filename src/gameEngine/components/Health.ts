import {HEALTH_COMP} from './ComponentNamesConfig';

class Health {
  name:string;
  max:number;
  current:number;
  constructor(maxHealth) {
    this.name = HEALTH_COMP;
    this.max = maxHealth;
    this.current = maxHealth;
  }
}

export default Health;