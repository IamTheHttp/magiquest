import {ITileMap} from '../../../interfaces/IZones';
import {IZoneJSON} from '../../../interfaces/database/IZoneJSON';

export function createNewZoneRequest(input: {act: number; chapter: number; numRows: number; numCols: number}): Promise<{
  status: 'OK' | string;
  message: 'Zone created successfully' | string;
  data: {
    zoneJSON: IZoneJSON;
    tileMapJSON: {act: number; chapter: number; tileMap: ITileMap};
  };
}> {
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
      return data;
    });
}
