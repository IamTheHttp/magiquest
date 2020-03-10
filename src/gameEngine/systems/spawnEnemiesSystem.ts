import {
  CAN_SPAWN_COMP
} from '../components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {getGridIdxFromPos} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import Enemy from "entities/characters/Enemies/Enemy";
import Imp from "entities/characters/Enemies/Imp";
import Demon from "entities/characters/Enemies/Demon";
import Gargoyle from "entities/characters/Enemies/Gargoyle";
import Vampire from "entities/characters/Enemies/Vampire";

let {entityLoop} = GAME_PLATFORM;


function spawnEnemiesSystem(systemArguments: ISystemArguments) {
  let {Entity} = systemArguments;
  let entities = Entity.getByComps([CAN_SPAWN_COMP]);

  entityLoop(entities, (entity: BaseEntity) => {
    let {x, y} = entity.getPos(); // for example a tile that can spawn
    entity[CAN_SPAWN_COMP].enemies.forEach((enemyToSpawn) => {
      if (Math.random() < enemyToSpawn.chance) {
        if (enemyToSpawn.characterType === CHARACTERS.ENEMY) {
          let {col, row} = getGridIdxFromPos(x, y);
          let characterLevel = enemyToSpawn.characterLevel;
          new Enemy({col, row, characterLevel});
        }

        if (enemyToSpawn.characterType === CHARACTERS.IMP) {
          let {col, row} = getGridIdxFromPos(x, y);
          let characterLevel = enemyToSpawn.characterLevel;
          new Imp({col, row, characterLevel});
        }

        if (enemyToSpawn.characterType === CHARACTERS.DEMON) {
          let {col, row} = getGridIdxFromPos(x, y);
          let characterLevel = enemyToSpawn.characterLevel;
          new Demon({col, row, characterLevel});
        }

        if (enemyToSpawn.characterType === CHARACTERS.GARGOYLE) {
          let {col, row} = getGridIdxFromPos(x, y);
          let characterLevel = enemyToSpawn.characterLevel;
          new Gargoyle({col, row, characterLevel});
        }

        if (enemyToSpawn.characterType === CHARACTERS.VAMPIRE) {
          let {col, row} = getGridIdxFromPos(x, y);
          let characterLevel = enemyToSpawn.characterLevel;
          new Vampire({col, row, characterLevel});
        }
      }
    });
    entity.removeComponent(CAN_SPAWN_COMP);
  });
}

export default spawnEnemiesSystem;