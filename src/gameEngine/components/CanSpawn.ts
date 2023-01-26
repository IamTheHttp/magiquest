import {CAN_SPAWN} from './_ComponentNamesConfig';
import {AllowedZoneLocationIDs} from '../gameConstants';

class CanSpawn {
  name: string;
  tileLocationID: AllowedZoneLocationIDs;
  tileEntityLevel: number;
  constructor(tileLocation: AllowedZoneLocationIDs, tileEntityLevel: number) {
    this.name = CAN_SPAWN;
    this.tileLocationID = tileLocation;
    this.tileEntityLevel = tileEntityLevel;
  }
}

export default CanSpawn;
