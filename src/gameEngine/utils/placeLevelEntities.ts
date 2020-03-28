import Character from 'gameEngine/entities/characters/Character';
import FamNPC from 'entities/characters/FamNPC';
import assertType from 'gameEngine/utils/assertType';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {AllowedLevelLocationIDs, CHARACTERS} from 'gameEngine/gameConstants';
import {ILevelArea} from "../../interfaces/levels.i";
import {ITileIndexMap} from "../../interfaces/interfaces";
import charactersDataConfig from "../../levels/charactersDataConfig";
import Chest from "entities/characters/Chest";
import createFamNPC from "../../../__tests__/__TEST__UTILS__/createFamNPC";

/**
 * @description Place entities in a given levelArea.
 *              Used to place Enemies as well as Friendly NPCs
 *              enemies placed here are configured in levelArea.entitiesToPlace, including their characterLevel
 * @param {ILevelArea} levelArea
 * @param {ITileIndexMap} tileIdxMap
 */
function placeLevelEntities(levelArea: ILevelArea, tileIdxMap: ITileIndexMap) {
  for (let i = 0; i < levelArea.entitiesToPlace.length; i++) {
    let entityToPlace = levelArea.entitiesToPlace[i];
    let entity = undefined;

    let {col, row} = entityToPlace.pos;
    let {x, y} = getCenterPosOfGridIdx(col, row);
    let characterLevel =  entityToPlace.characterLevel;

    // Fetch what to spawn from config!
    let characterConfig = charactersDataConfig[entityToPlace.characterType];

    if (characterConfig) {
      switch (entityToPlace.characterType) {
        case CHARACTERS.CHEST: {
          entity = new Chest({col, row, characterLevel, spawningTileLocationID: null}, characterConfig);
          break;
        }
        case CHARACTERS.FAM_NPC: {
          entity = new FamNPC({col, row, characterLevel, spawningTileLocationID: null}, characterConfig);
          break;
        }
        default: {
          entity = new Character({col, row, characterLevel, spawningTileLocationID: null}, characterConfig);
        }
      }
    }

    if (!entity) {
      assertType(entity, 'Entity to place', 'object');
      return;
    }

    updateMapTileIdx({entity, tileIdxMap, newX: entity.getPos().x, newY: entity.getPos().y});
  }
}

export default placeLevelEntities;