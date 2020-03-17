import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {ISpawnableEnemies} from "../../interfaces/interfaces";
import {AllowedLevelLocationIDs} from "gameConstants";

class CanSpawn {
  name:string;
  enemies:ISpawnableEnemies;
  tileLocationID: AllowedLevelLocationIDs;
  constructor(enemies: ISpawnableEnemies = [], tileLocation: AllowedLevelLocationIDs) {
    this.name = CAN_SPAWN_COMP;
    this.tileLocationID = tileLocation;
    enemies.forEach((enemyToSpawn) => {
      assertType(enemyToSpawn.chance, 'Chance to spawn', 'number');
      assertType(enemyToSpawn.characterType, 'Type of enemy to spawn', 'string');
    });

    this.enemies = enemies;
  }
}

export default CanSpawn;