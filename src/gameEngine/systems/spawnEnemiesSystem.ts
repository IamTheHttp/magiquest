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
  let spawningEntities = Entity.getByComps([CAN_SPAWN_COMP]);

  entityLoop(spawningEntities, (spawningEntity: BaseEntity) => {
    const {x, y} = spawningEntity.getPos(); // for example a tile that can spawn
    const {col, row} = getGridIdxFromPos(x, y);
    const spawningTileLocationID = spawningEntity[CAN_SPAWN_COMP].tileLocationID;
    const characterLevel = spawningEntity[CAN_SPAWN_COMP].tileCharacterLevel;
    const spawnableEnemies = systemArguments.levelArea.spawnableEnemies;
    const monsterDensity = systemArguments.levelArea.monsterDensity;

    spawnableEnemies.forEach((enemyToSpawn) => {
      if (Math.random() < monsterDensity) { // TODO refactor to a function "rollDie" or "resolveChance"
        // Fetch what to spawn from config!
        let characterConfig = charactersDataConfig[enemyToSpawn];
        if (characterConfig) {
          new Enemy({col, row, characterLevel, spawningTileLocationID}, characterConfig);
          return;
        }
      }
    });
    spawningEntity.removeComponent(CAN_SPAWN_COMP);
  });
}

export default spawnEnemiesSystem;