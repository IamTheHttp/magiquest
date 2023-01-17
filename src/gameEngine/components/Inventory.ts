import {INVENTORY_COMP} from './ComponentNamesConfig';
import {IItem, IWeapon} from '../classes/Item';

/**
 * This component allows an entity to have a few things
 * - Equipped inventory
 * - Backpack inventory
 *
 */
export class InventoryComponent {
  name: string;
  equipped: IWeapon[];
  backpack: IItem[];
  constructor() {
    this.name = INVENTORY_COMP;
    this.equipped = [];
    this.backpack = [];
  }

  addItemToBackpack(item: IItem) {
    this.backpack.push(item);
  }

  equipWeapon(weapon: IWeapon) {
    this.equipped.push(weapon);
  }

  resetInventory() {
    this.equipped = [];
    this.backpack = [];
  }
}
