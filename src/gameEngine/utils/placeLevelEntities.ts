import {bit} from 'gameEngine/config';
import Sentry from 'gameEngine/entities/Sentry';
import FamNPC from 'gameEngine/entities/FamNPC';
import assertType from 'gameEngine/utils/assertType';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import { CHARACTERS } from 'gameEngine/gameConstants';
import Chest from 'gameEngine/entities/Chest';

function placeLevelEntities(levelArea, tileIdxMap) {
  for (let i = 0; i < levelArea.entitiesToPlace.length; i++) {
    let entityToPlace = levelArea.entitiesToPlace[i];

    /** @type {BaseEntity} */
    let entity = null;

    let {col, row} = entityToPlace.pos;
    let {x, y} = getCenterPosOfGridIdx(col, row);

    // create an entity
    if (entityToPlace.type === CHARACTERS.SENTRY) {
      entity = new Sentry({col, row});
    }

    if (entityToPlace.type === CHARACTERS.FAM_NPC) {
      // TODO place with col/row instead of x,y
      entity = new FamNPC({x, y, name: entityToPlace.name});
    }

    if (entityToPlace.type === CHARACTERS.CHEST) {
      // TODO place with col/row instead of x,y
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