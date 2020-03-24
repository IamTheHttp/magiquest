export default function getColRowByTileIdx(tileIdx:string): {col:number, row:number} {
  let col = +tileIdx.split('-')[0];
  let row = +tileIdx.split('-')[1];
  return {
    row, col
  }
};