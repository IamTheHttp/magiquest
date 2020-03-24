import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {ISpawnableEnemies} from "../../interfaces/interfaces";
import {AllowedLevelLocationIDs} from "gameConstants";

class CanSpawn {
  name:string;
  enemies:ISpawnableEnemies;
  tileLocationID: AllowedLevelLocationIDs;
  tileCharacterLevel: number;
  constructor(enemies: ISpawnableEnemies = [], tileLocation: AllowedLevelLocationIDs, tileCharacterLevel:number) {
    this.name = CAN_SPAWN_COMP;
    this.tileLocationID = tileLocation;
    this.tileCharacterLevel = tileCharacterLevel;
    enemies.forEach((enemyToSpawn) => {
      assertType(enemyToSpawn.chance, 'Chance to spawn', 'number');
      assertType(enemyToSpawn.characterType, 'Type of enemy to spawn', 'string');
    });

    this.enemies = enemies;
  }
}

export default CanSpawn;