import {WAS_SPAWNED} from './_ComponentNames';
import {I_ALLOWED_ZONE_LOCATION_IDS} from '../gameConstants';

class WasSpawned {
  name: string;
  spawningTileLocationID: I_ALLOWED_ZONE_LOCATION_IDS;
  constructor(spawningTileLocationID: I_ALLOWED_ZONE_LOCATION_IDS) {
    this.name = WAS_SPAWNED;
    this.spawningTileLocationID = spawningTileLocationID;
  }
}

export default WasSpawned;
