import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import {AllowedLevelLocationIDs} from "../gameConstants";

class CanSpawn {
  name:string;
  tileLocationID: AllowedLevelLocationIDs;
  tileCharacterLevel: number;
  constructor(tileLocation: AllowedLevelLocationIDs, tileCharacterLevel:number) {
    this.name = CAN_SPAWN_COMP;
    this.tileLocationID = tileLocation;
    this.tileCharacterLevel = tileCharacterLevel;
  }
}

export default CanSpawn;