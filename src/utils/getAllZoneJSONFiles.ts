// get all stuff :D
// @ts-ignore
import {IZoneJSON} from '../interfaces/database/IZoneJSON';

function requireAll(r: any) {
  return r.keys().map(r);
}

export function getAllZoneJSONFiles() {
  // @ts-ignore
  const zones: IZoneJSON[] = requireAll(require.context('../data/database/zones', true, /\.json$/));
  return zones;
}
