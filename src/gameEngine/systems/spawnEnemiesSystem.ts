import {
  CAN_SPAWN_COMP
} from '../components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {getGridIdxFromPos} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ISystemArguments} from "../../interfaces/gameloop.i";
import BaseEntity from "BaseEntity";
import Character from "gameEngine/entities/characters/Character";
import charactersDataConfig from "../../levels/charactersDataConfig";
import Enemy from "entities/characters/Enemy";

let {entityLoop} = GAME_PLATFORM;

function spawnEnemiesSystem(systemArguments: ISystemArguments) {
  let {Entity} = systemArguments;
  let entities = Entity.getByComps([CAN_SPAWN_COMP]);

  entityLoop(entities, (entity: BaseEntity) => {
    let {x, y} = entity.getPos(); // for example a tile that can spawn
    entity[CAN_SPAWN_COMP].enemies.forEach((enemyToSpawn) => {
      if (Math.random() < enemyToSpawn.chance) {
        let spawningTileLocationID = entity[CAN_SPAWN_COMP].tileLocationID;
        let characterLevel = entity[CAN_SPAWN_COMP].tileCharacterLevel;

        // Fetch what to spawn from config!
        let characterConfig = charactersDataConfig[enemyToSpawn.characterType];

        if (characterConfig) {
          let {col, row} = getGridIdxFromPos(x, y);
          new Enemy({col, row, characterLevel, spawningTileLocationID}, characterConfig);
          return;
        }
      }
    });
    entity.removeComponent(CAN_SPAWN_COMP);
  });
}

export default spawnEnemiesSystem;