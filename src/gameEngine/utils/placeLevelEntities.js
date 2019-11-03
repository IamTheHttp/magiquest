import {bit} from 'config';
import {CHARACTERS} from 'gameConstants';
import Sentry from 'entities/Sentry';
import FamNPC from 'entities/FamNPC';
import assertType from 'utils/assertType';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';

function placeLevelEntities(levelArea, tileIdxMap) {
  for (let i = 0; i < levelArea.entitiesToPlace.length; i++) {
    let entityToPlace = levelArea.entitiesToPlace[i];

    /** @type {BaseEntity} */
    let entity = null;

    let x = entityToPlace.pos.col * bit + 0.5 * bit;
    let y = entityToPlace.pos.row * bit + 0.5 * bit;

    // create an entity
    if (entityToPlace.type === CHARACTERS.SENTRY) {
      entity = new Sentry({x, y});
    }

    if (entityToPlace.type === CHARACTERS.FAM_NPC) {
      entity = new FamNPC({x, y, name: entityToPlace.name});
    }

    if (!entity) {
      assertType(entity, 'Entity to place', 'object');
      return;
    }

    updateMapTileIdx({entity, tileIdxMap, newX: entity.getPos().x, newY: entity.getPos().y});
  }
}

export default placeLevelEntities;