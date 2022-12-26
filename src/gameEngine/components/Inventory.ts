import {INVENTORY_COMP} from './ComponentNamesConfig';

interface Weapon {
  minDmg: number;
  maxDmg: number;
  // "attackSpeed": 30, // What is this number?
  // "modifiers"?: []
}

class MySword implements Weapon {
  minDmg: number;
  maxDmg: number;
  // sprite: string;
  constructor() {
    this.minDmg = 5;
    this.maxDmg = 10;
    // this.sprite: '';
  }
}

export class InventoryComponent {
  name: string;
  equipped: Weapon[];
  backpack: any[];
  constructor() {
    this.name = INVENTORY_COMP;
    this.equipped = [];
  }

  addWeapon(weapon: Weapon) {
    this.equipped.push(weapon);
  }
}
