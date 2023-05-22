import {SPAWNER} from './_ComponentNames';
import {I_ALLOWED_ZONE_LOCATION_IDS} from '../gameConstants';

class Spawner {
  name: string;
  tileLocationID: I_ALLOWED_ZONE_LOCATION_IDS;
  tileEntityLevel: number;
  constructor(tileLocation: I_ALLOWED_ZONE_LOCATION_IDS, tileEntityLevel: number) {
    this.name = SPAWNER;
    this.tileLocationID = tileLocation;
    this.tileEntityLevel = tileEntityLevel;
  }
}

export default Spawner;
