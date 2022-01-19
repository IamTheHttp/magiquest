export interface ISprite {
  cropStartX: number;
  cropStartY: number;
  cropSizeX: number;
  cropSizeY: number;
}

export interface ITileTypes {
  [key: number]: ISprite;
}
