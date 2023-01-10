import {getSprites} from '../getSprites';

export interface IItem {
  spriteName: keyof ReturnType<typeof getSprites>;
}

export interface IWeapon extends IItem {
  minDmg: number;
  maxDmg: number;
  // "attackSpeed": 30, // What is this number?
  // "modifiers"?: []
}

export class MySword implements IWeapon {
  minDmg: number;
  maxDmg: number;
  spriteName: keyof ReturnType<typeof getSprites>;

  constructor() {
    this.minDmg = 5;
    this.maxDmg = 10;
    this.spriteName = 'ITEM_SWORD';
  }
}
