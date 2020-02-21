import Sentry from 'gameEngine/entities/Sentry';
import FamNPC from 'gameEngine/entities/FamNPC';
import assertType from 'gameEngine/utils/assertType';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import { getCenterPosOfGridIdx } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import { CHARACTERS } from 'gameEngine/gameConstants';
import Chest from 'gameEngine/entities/Chest';
function placeLevelEntities(levelArea, tileIdxMap) {
    for (var i = 0; i < levelArea.entitiesToPlace.length; i++) {
        var entityToPlace = levelArea.entitiesToPlace[i];
        /** @type {BaseEntity} */
        var entity = null;
        var _a = entityToPlace.pos, col = _a.col, row = _a.row;
        var _b = getCenterPosOfGridIdx(col, row), x = _b.x, y = _b.y;
        // create an entity
        if (entityToPlace.type === CHARACTERS.SENTRY) {
            entity = new Sentry({ col: col, row: row });
        }
        if (entityToPlace.type === CHARACTERS.FAM_NPC) {
            // TODO place with col/row instead of x,y
            entity = new FamNPC({ x: x, y: y, name: entityToPlace.name });
        }
        if (entityToPlace.type === CHARACTERS.CHEST) {
            // TODO place with col/row instead of x,y
            entity = new Chest({ col: col, row: row });
        }
        if (!entity) {
            assertType(entity, 'Entity to place', 'object');
            return;
        }
        updateMapTileIdx({ entity: entity, tileIdxMap: tileIdxMap, newX: entity.getPos().x, newY: entity.getPos().y });
    }
}
export default placeLevelEntities;
