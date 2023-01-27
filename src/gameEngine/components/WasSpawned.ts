import {WAS_SPAWNED} from './_ComponentNames';
import {AllowedZoneLocationIDs} from '../gameConstants';

class WasSpawned {
  name: string;
  spawningTileLocationID: AllowedZoneLocationIDs;
  constructor(spawningTileLocationID: AllowedZoneLocationIDs) {
    this.name = WAS_SPAWNED;
    this.spawningTileLocationID = spawningTileLocationID;
  }
}

export default WasSpawned;
