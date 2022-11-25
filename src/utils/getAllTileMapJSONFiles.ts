// get all stuff :D
// @ts-ignore
import {ITileMapJSON} from '../interfaces/ITileMapJSON';

function requireAll(r: any) {
  return r.keys().map(r);
}

export function getAllTileMapJSONFiles() {
  // @ts-ignore
  const tileMapsJSONs: ITileMapJSON[] = requireAll(require.context('../data/json/maps', true, /\.json$/));
  return tileMapsJSONs;
}
