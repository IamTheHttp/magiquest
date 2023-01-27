import {INVENTORY} from './_ComponentNames';
import {ItemEntity} from '../entities/placeableEntities/Item';

/**
 * This component allows an entity to have a few things
 * - Equipped inventory
 * - Backpack inventory
 *
 */
export class HasInventory {
  name: string;
  equipped: ItemEntity[];
  backpack: ItemEntity[];
  constructor() {
    this.name = INVENTORY;
    this.equipped = [];
    this.backpack = [];
  }

  addItemToBackpack(item: ItemEntity) {
    this.backpack.push(item);
  }

  equipItem(item: ItemEntity) {
    this.equipped.push(item);
  }

  resetInventory() {
    this.equipped = [];
    this.backpack = [];
  }
}
