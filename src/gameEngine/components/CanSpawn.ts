import {CAN_SPAWN_COMP} from './_ComponentNamesConfig';
import {AllowedZoneLocationIDs} from '../gameConstants';

class CanSpawn {
  name: string;
  tileLocationID: AllowedZoneLocationIDs;
  tileEntityLevel: number;
  constructor(tileLocation: AllowedZoneLocationIDs, tileEntityLevel: number) {
    this.name = CAN_SPAWN_COMP;
    this.tileLocationID = tileLocation;
    this.tileEntityLevel = tileEntityLevel;
  }
}

export default CanSpawn;
