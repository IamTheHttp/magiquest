import * as path from 'path';
import * as fs from 'fs';

export function getAllZoneJSONFiles(DATA_BASE_PATH) {
  const ZONES_JSON_PATH = path.join(DATA_BASE_PATH, 'json', 'zones');
  const zoneFileNames = fs.readdirSync(ZONES_JSON_PATH);

  const allZonesJSONArr = [];

  zoneFileNames.forEach((zoneFileName) => {
    allZonesJSONArr.push(JSON.parse(fs.readFileSync(path.join(ZONES_JSON_PATH, zoneFileName), 'utf-8')));
  });
  return allZonesJSONArr;
}
