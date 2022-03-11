import Game from '../../../gameEngine/Game';

export function createNewZoneRequest(input: {act: number; chapter: number; numRows: number; numCols: number}) {
  fetch('http://localhost:3000/zones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      act: input.act,
      chapter: input.chapter,
      numRows: input.numRows,
      numCols: input.numCols
    })
  });
}
