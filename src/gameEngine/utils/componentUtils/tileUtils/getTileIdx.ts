import {BaseEntity} from '../../../BaseEntity';
import {TILE_SIZE} from '../../../gameConstants';

function getTileIdxByPos(x: number, y: number) {
  let col = Math.floor(x / TILE_SIZE);
  let row = Math.floor(y / TILE_SIZE);

  return `${col},${row}`; // TODO move to util to abstract the comma
}

function getTileIdxByEnt(entity: BaseEntity) {
  let {x, y} = entity.getPos();

  return getTileIdxByPos(x, y);
}

export {getTileIdxByEnt, getTileIdxByPos};
