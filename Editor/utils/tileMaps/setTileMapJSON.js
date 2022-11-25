import fs from 'fs';
import {getTileMapJSONFileName} from './getTileMapJSONFileName.js';

export function setTileMapJSON(act, chapter, tileMap) {
  const MAP_FILE_NAME = getTileMapJSONFileName(act, chapter);
  fs.writeFileSync(MAP_FILE_NAME, JSON.stringify(tileMap));
}
