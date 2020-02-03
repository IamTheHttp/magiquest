import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';

class CanSpawn {
  name:string;
  enemies:any;
  constructor(enemies = []) {
    this.name = CAN_SPAWN_COMP;

    enemies.forEach((enemyToSpawn) => {
      assertType(enemyToSpawn.chance, 'Chance to spawn', 'number');
      assertType(enemyToSpawn.enemy, 'Type of enemy to spawn', 'string');
    });

    this.enemies = enemies;
  }
}

export default CanSpawn;