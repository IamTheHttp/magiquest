import {STACKABLE_ON_MAP} from './ComponentNamesConfig';

/**
 * This component determines if more than one item can be placed on the same tile
 * It's used in rendering to show the number of items on the tile
 */
export class StackableOnMapComponent {
  name: string;
  constructor() {
    this.name = STACKABLE_ON_MAP;
  }
}
