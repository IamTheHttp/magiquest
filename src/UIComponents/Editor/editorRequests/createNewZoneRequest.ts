import Game from '../../../gameEngine/Game';

export function createNewZoneRequest(input: {act: number; chapter: number; numRows: number; numCols: number}) {
  return fetch('http://localhost:3000/zones', {
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
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}
