import fs from 'fs';
import {getZoneJSONFileName} from './getZoneJSONFileName.js';

export function deleteZoneJSON(act, chapter, zoneJSON) {
  const ZONE_FILE_NAME = getZoneJSONFileName(act, chapter);
  fs.unlinkSync(ZONE_FILE_NAME);
}
