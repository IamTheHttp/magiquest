// get all stuff :D
// @ts-ignore
import {IPlaceableEntityJSON} from '../interfaces/IPlaceableEntityJSON';

function requireAll(r: any) {
  return r.keys().map(r);
}

export function getAllPlaceableEntityJSONFiles() {
  const placeableEntitiesJSON: IPlaceableEntityJSON[] = requireAll(
    // @ts-ignore
    require.context('../data/json/placeableEntity', true, /\.json$/)
  );
  return placeableEntitiesJSON;
}
