import {ITEM_PICKUP} from './_ComponentNames';

/**
 * This component determines if movement is blocked on the map when this entity is on a tile
 */
export class ItemPickup {
  name: string;
  constructor() {
    this.name = ITEM_PICKUP;
  }
}
