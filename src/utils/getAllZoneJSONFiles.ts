// get all stuff :D
// @ts-ignore
import {IZoneJSON} from '../interfaces/IZoneJSON';

function requireAll(r: any) {
  return r.keys().map(r);
}

export function getAllZoneJSONFiles() {
  // @ts-ignore
  const zones: IZoneJSON[] = requireAll(require.context('../data/json/zones', true, /\.json$/));
  return zones;
}
