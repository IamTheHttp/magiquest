import {SPAWNED_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {ISpawnableEnemies} from "../../interfaces/interfaces";
import {AllowedLevelLocationIDs} from "gameConstants";

class SpawnedComponent {
  name:string;
  spawningTileLocationID: AllowedLevelLocationIDs;
  constructor(spawningTileLocationID: AllowedLevelLocationIDs) {
    this.name = SPAWNED_COMP;
    this.spawningTileLocationID = spawningTileLocationID;
  }
}

export default SpawnedComponent;