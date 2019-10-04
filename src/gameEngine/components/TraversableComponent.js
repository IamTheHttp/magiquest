import {TRAVERSABLE_COMP} from 'gameEngine/constants';
// if an entity has this Component, players can walk over it
class TraversableComponent {
  constructor() {
    this.name = TRAVERSABLE_COMP;
  }
}

export default TraversableComponent;
