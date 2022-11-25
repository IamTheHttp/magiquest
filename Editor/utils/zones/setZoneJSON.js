import fs from 'fs';
import {getZoneJSONFileName} from './getZoneJSONFileName.js';

export function setZoneJSON(act, chapter, zoneJSON) {
  const ZONE_FILE_NAME = getZoneJSONFileName(act, chapter);
  fs.writeFileSync(ZONE_FILE_NAME, JSON.stringify(zoneJSON));
}
