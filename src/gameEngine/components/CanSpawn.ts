import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import {AllowedZoneLocationIDs} from '../gameConstants';

class CanSpawn {
  name: string;
  tileLocationID: AllowedZoneLocationIDs;
  tileCharacterLevel: number;
  constructor(tileLocation: AllowedZoneLocationIDs, tileCharacterLevel: number) {
    this.name = CAN_SPAWN_COMP;
    this.tileLocationID = tileLocation;
    this.tileCharacterLevel = tileCharacterLevel;
  }
}

export default CanSpawn;
