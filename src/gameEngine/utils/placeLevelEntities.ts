import {bit} from 'gameEngine/config';
import Enemy from 'entities/characters/Enemies/Enemy';
import FamNPC from 'entities/characters/FamNPC';
import assertType from 'gameEngine/utils/assertType';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {
  getCenterPosOfGridIdx,
  getGridIdxFromPos
} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {AllowedLevelLocationIDs, CHARACTERS} from 'gameEngine/gameConstants';
import Chest from 'gameEngine/entities/Chest';
import {ILevelArea} from "../../interfaces/levels.i";
import {ITileIndexMap} from "../../interfaces/interfaces";
import charactersDataConfig from "../../levels/charactersDataConfig";

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
    let entity = null;

    let {col, row} = entityToPlace.pos;
    let {x, y} = getCenterPosOfGridIdx(col, row);
    let characterLevel =  entityToPlace.characterLevel;

    // Fetch what to spawn from config!
    let characterConfig = charactersDataConfig[entityToPlace.characterType];

    if (characterConfig) {
      entity = new Enemy({col, row, characterLevel, spawningTileLocationID: AllowedLevelLocationIDs.TOWN}, characterConfig);
    }

    if (entityToPlace.characterType === CHARACTERS.FAM_NPC) {
      // TODO place with col/row instead of x,y
      entity = new FamNPC({x, y, name: entityToPlace.name});
    }

    if (entityToPlace.characterType === CHARACTERS.CHEST) {
      entity = new Chest({col, row});
    }

    if (!entity) {
      assertType(entity, 'Entity to place', 'object');
      return;
    }

    updateMapTileIdx({entity, tileIdxMap, newX: entity.getPos().x, newY: entity.getPos().y});
  }
}

export default placeLevelEntities;