// get all stuff :D
// @ts-ignore
import {IPlaceableEntityJSON} from '../interfaces/database/IPlaceableEntityJSON';

function requireAll(r: any) {
  return r.keys().map(r);
}

export function getAllPlaceableEntityJSONFiles() {
  const placeableEntitiesJSON: IPlaceableEntityJSON[] = requireAll(
    // @ts-ignore
    require.context('../data/database/placeableEntity', true, /\.json$/)
  );
  return placeableEntitiesJSON;
}
