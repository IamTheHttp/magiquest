export type IPlaceableEntityJSON = {
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attackSpeed: string;
  id: string;
  displayName: string;
  radius: number; // for now everyone uses 16
  animationTypes: string;
};
