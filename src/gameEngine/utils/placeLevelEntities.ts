import assertType from 'gameEngine/utils/assertType';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {PLACEABLE_ENTITIES} from 'gameEngine/gameConstants';
import {IZone} from '../../interfaces/IZones';
import {ITileIndexMap} from '../../interfaces/IGeneral';
import Chest from '../entities/placeableEntities/Chest';
import FamNPC from '../entities/placeableEntities/FamNPC';
import Enemy from '../entities/placeableEntities/Enemy';
import {IPlaceableEntityDataMap} from '../../interfaces/IPlaceableEntityData';

/**
 * @description Place entities in a given levelArea.
 *              Used to place Enemies as well as Friendly NPCs
 *              enemies placed here are configured in levelArea.entitiesToPlace, including their entityLevel
 */
function placeLevelEntities(zone: IZone, tileIdxMap: ITileIndexMap, placeableEntityDataMap: IPlaceableEntityDataMap) {
  for (let i = 0; i < zone.entitiesToPlace.length; i++) {
    let entityToPlace = zone.entitiesToPlace[i];
    let entity = undefined;

    let {col, row} = entityToPlace.pos;
    let {x, y} = getCenterPosOfGridIdx(col, row);
    let entityLevel = entityToPlace.entityLevel;

    // Fetch what to spawn from config!
    let placeableEntityConfig = placeableEntityDataMap[entityToPlace.characterType];

    if (placeableEntityConfig) {
      switch (entityToPlace.characterType) {
        case PLACEABLE_ENTITIES.CHEST: {
          entity = new Chest({col, row, entityLevel, spawningTileLocationID: null}, placeableEntityConfig);
          break;
        }
        case PLACEABLE_ENTITIES.FAM_NPC: {
          entity = new FamNPC({col, row, entityLevel, spawningTileLocationID: null}, placeableEntityConfig);
          break;
        }
        default: {
          entity = new Enemy({col, row, entityLevel, spawningTileLocationID: null}, placeableEntityConfig);
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
