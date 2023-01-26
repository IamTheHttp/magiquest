import {CAN_PICKUP_ITEMS} from './_ComponentNamesConfig';

/**
 * This component determines if movement is blocked on the map when this entity is on a tile
 */
export class CanPickupItems {
  name: string;
  constructor() {
    this.name = CAN_PICKUP_ITEMS;
  }
}
