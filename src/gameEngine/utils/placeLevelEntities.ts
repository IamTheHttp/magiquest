import assertType from 'gameEngine/utils/assertType';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {PLACEABLE_ENTITIES} from 'gameEngine/gameConstants';
import {IZone} from '../../interfaces/IZones';
import {ITileIndexMap} from '../../interfaces/IGeneral';
import {placeableEntityMap} from '../../data/placeableEntityMap';
import createFamNPC from '../../../__tests__/__TEST__UTILS__/createFamNPC';
import Chest from '../entities/placeableEntities/Chest';
import FamNPC from '../entities/placeableEntities/FamNPC';
import Enemy from '../entities/placeableEntities/Enemy';

/**
 * @description Place entities in a given levelArea.
 *              Used to place Enemies as well as Friendly NPCs
 *              enemies placed here are configured in levelArea.entitiesToPlace, including their characterLevel
 * @param {IZone} levelArea
 * @param {ITileIndexMap} tileIdxMap
 */
function placeLevelEntities(zone: IZone, tileIdxMap: ITileIndexMap) {
  for (let i = 0; i < zone.entitiesToPlace.length; i++) {
    let entityToPlace = zone.entitiesToPlace[i];
    let entity = undefined;

    let {col, row} = entityToPlace.pos;
    let {x, y} = getCenterPosOfGridIdx(col, row);
    let characterLevel = entityToPlace.characterLevel;

    // Fetch what to spawn from config!
    let characterConfig = placeableEntityMap[entityToPlace.characterType];

    if (characterConfig) {
      switch (entityToPlace.characterType) {
        case PLACEABLE_ENTITIES.CHEST: {
          entity = new Chest({col, row, characterLevel, spawningTileLocationID: null}, characterConfig);
          break;
        }
        case PLACEABLE_ENTITIES.FAM_NPC: {
          entity = new FamNPC({col, row, characterLevel, spawningTileLocationID: null}, characterConfig);
          break;
        }
        default: {
          entity = new Enemy({col, row, characterLevel, spawningTileLocationID: null}, characterConfig);
        }
      }
    }

    if (!entity) {
      assertType(entity, 'Entity to place', 'object');
      return;
    }

    updateMapTileIdx({
      entity,
      tileIdxMap,
      newX: entity.getPos().x,
      newY: entity.getPos().y
    });
  }
}

export default placeLevelEntities;
