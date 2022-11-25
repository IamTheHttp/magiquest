import fs from 'fs';
import {getTileMapJSONFileName} from './getTileMapJSONFileName.js';

export function getTileMapJSON(act, chapter) {
  const MAP_FILE_NAME = getTileMapJSONFileName(act, chapter);
  return JSON.parse(fs.readFileSync(MAP_FILE_NAME, 'utf-8'));
}
