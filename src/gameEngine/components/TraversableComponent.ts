// if an entity has this Component, players can walk over it
import {TRAVERSABLE_COMP} from './ComponentNamesConfig';

class TraversableComponent {
  name: string;
  constructor() {
    this.name = TRAVERSABLE_COMP;
  }
}

export default TraversableComponent;
