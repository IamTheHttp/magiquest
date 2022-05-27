import {ITileMap} from '../../../interfaces/IZones';
import IZoneData from '../../../interfaces/IZoneData';

export function createNewZoneRequest(input: {act: number; chapter: number; numRows: number; numCols: number}): Promise<{
  status: 'OK' | string;
  message: 'Zone created successfully' | string;
  data: {
    zoneJSON: IZoneData;
    mapJSON: {tileMap: ITileMap};
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
      console.log(data);
      return data;
    });
}
