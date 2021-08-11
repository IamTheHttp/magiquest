import {SPAWNED_COMP} from './ComponentNamesConfig';
import {AllowedLevelLocationIDs} from "../gameConstants";

class SpawnedComponent {
  name:string;
  spawningTileLocationID: AllowedLevelLocationIDs;
  constructor(spawningTileLocationID: AllowedLevelLocationIDs) {
    this.name = SPAWNED_COMP;
    this.spawningTileLocationID = spawningTileLocationID;
  }
}

export default SpawnedComponent;