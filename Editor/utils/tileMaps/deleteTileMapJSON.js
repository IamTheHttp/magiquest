import fs from 'fs';
import {getTileMapJSONFileName} from './getTileMapJSONFileName.js';

export function deleteTileMapJSON(act, chapter, tileMap) {
  const MAP_FILE_NAME = getTileMapJSONFileName(act, chapter);
  fs.unlinkSync(MAP_FILE_NAME);
}
