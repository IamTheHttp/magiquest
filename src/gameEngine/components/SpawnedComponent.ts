import {SPAWNED_COMP} from './ComponentNamesConfig';
import {AllowedZoneLocationIDs} from '../gameConstants';

class SpawnedComponent {
  name: string;
  spawningTileLocationID: AllowedZoneLocationIDs;
  constructor(spawningTileLocationID: AllowedZoneLocationIDs) {
    this.name = SPAWNED_COMP;
    this.spawningTileLocationID = spawningTileLocationID;
  }
}

export default SpawnedComponent;
