export default function getColRowByTileIdx(tileIdx: string): {
  col: number;
  row: number;
} {
  let col = +tileIdx.split(',')[0]; // TODO move to util to abstract the comma
  let row = +tileIdx.split(',')[1]; // TODO move to util to abstract the comma
  return {
    row,
    col
  };
}
