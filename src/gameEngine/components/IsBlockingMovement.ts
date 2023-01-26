import {IS_BLOCKING_MOVEMENT} from './_ComponentNamesConfig';

/**
 * This component determines if movement is blocked on the map when this entity is on a tile
 */
export class IsBlockingMovement {
  name: string;
  constructor() {
    this.name = IS_BLOCKING_MOVEMENT;
  }
}
