import {BaseEntity} from '../../../BaseEntity';
import {TILE_SIZE} from '../../../gameConstants';

/**
 * Get a {col, row} object from a tileIdx
 * @param tileIdx
 */
export function getColRowByTileIdx(tileIdx: string): {
  col: number;
  row: number;
} {
  const col = +tileIdx.split(',')[0]; // TODO move to util to abstract the comma
  const row = +tileIdx.split(',')[1]; // TODO move to util to abstract the comma
  return {
    row,
    col
  };
}

export function getColRowByEntity(ent: BaseEntity) {
  const idx = getTileIdxByEnt(ent);
  return getColRowByTileIdx(idx);
}

/**
 * Return the col/row string that represents the index of a tile, for example x=0,y=0 would return 0,0
 * @param x
 * @param y
 */
export function getTileIdxByPos(x: number, y: number) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);

  return `${col},${row}`; // TODO move to util to abstract the comma
}

/**
 * Get the tileIndex: "col,row" of an entity
 * @param entity
 */
export function getTileIdxByEnt(entity: BaseEntity) {
  const {x, y} = entity.getPos();

  return getTileIdxByPos(x, y);
}
