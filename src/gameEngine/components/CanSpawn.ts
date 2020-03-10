import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
import {ISpawnableEnemies} from "../../interfaces/interfaces";

class CanSpawn {
  name:string;
  enemies:ISpawnableEnemies
  constructor(enemies: ISpawnableEnemies = []) {
    this.name = CAN_SPAWN_COMP;

    enemies.forEach((enemyToSpawn) => {
      assertType(enemyToSpawn.chance, 'Chance to spawn', 'number');
      assertType(enemyToSpawn.characterType, 'Type of enemy to spawn', 'string');
    });

    this.enemies = enemies;
  }
}

export default CanSpawn;