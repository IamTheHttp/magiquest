import fs from 'fs';
import {getZoneJSONFileName} from './getZoneJSONFileName.js';

export function getZoneJSON(act, chapter, zoneJSON) {
  const ZONE_FILE_NAME = getZoneJSONFileName(act, chapter);
  return JSON.parse(fs.readFileSync(ZONE_FILE_NAME, 'utf-8'));
}
