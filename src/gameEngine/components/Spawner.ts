import {SPAWNER} from './_ComponentNames';
import {AllowedZoneLocationIDs} from '../gameConstants';

class Spawner {
  name: string;
  tileLocationID: AllowedZoneLocationIDs;
  tileEntityLevel: number;
  constructor(tileLocation: AllowedZoneLocationIDs, tileEntityLevel: number) {
    this.name = SPAWNER;
    this.tileLocationID = tileLocation;
    this.tileEntityLevel = tileEntityLevel;
  }
}

export default Spawner;
