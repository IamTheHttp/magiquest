// if an entity has this Component, players can walk over it
import {TRAVERSABLE} from './_ComponentNames';

class Traversable {
  name: string;
  constructor() {
    this.name = TRAVERSABLE;
  }
}

export default Traversable;
