import {BLOCKING} from './_ComponentNames';

/**
 * This component determines if movement is blocked on the map when this entity is on a tile
 */
export class Blocking {
  name: string;
  constructor() {
    this.name = BLOCKING;
  }
}
