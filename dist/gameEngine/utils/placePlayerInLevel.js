import { PLAYER_CONTROLLED_COMP } from 'gameEngine/components/ComponentNamesConfig';
import Player from 'gameEngine/entities/Player';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import { Entity } from 'gameEngine/BaseEntity';
import { getCenterPosOfGridIdx } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
function placePlayerInLevel(levelArea, tileIdxMap) {
    /** @type {BaseEntity} */
    var player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    var _a = levelArea.startPos, col = _a.col, row = _a.row;
    var _b = getCenterPosOfGridIdx(col, row), x = _b.x, y = _b.y;
    if (!player) {
        player = new Player({ col: col, row: row });
    }
    else {
        player.setPos({ x: x, y: y });
        player.stop();
    }
    updateMapTileIdx({ entity: player, tileIdxMap: tileIdxMap, newX: x, newY: y });
    return player;
}
export default placePlayerInLevel;
