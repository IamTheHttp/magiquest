import {CAN_SPAWN_COMP} from './ComponentNamesConfig';
import assertType from 'utils/assertType';

class CanSpawn {
  constructor(enemies = []) {
    this.name = CAN_SPAWN_COMP;

    // REFACTOR - Can this be behind NODE_ENV !== prod?
    enemies.forEach((enemyToSpawn) => {
      assertType(enemyToSpawn.chance, 'Chance to spawn', 'number');
      assertType(enemyToSpawn.enemy, 'Type of enemy to spawn', 'string');
    });

    this.enemies = enemies;
  }
}

export default CanSpawn;