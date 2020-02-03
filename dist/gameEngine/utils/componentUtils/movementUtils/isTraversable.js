import { TRAVERSABLE_COMP } from 'gameEngine/components/ComponentNamesConfig';
import { getTileIdxByPos } from '../tileUtils/getTileIdx';
// is an x, y traversable for an entity
function isTraversable(tileIdxMap, x, y, entity) {
    var tileIdx = getTileIdxByPos(x, y);
    if (!tileIdxMap[tileIdx]) {
        return;
    }
    var indexedTile = tileIdxMap[tileIdx];
    if (indexedTile.getEntCount() > 0) {
        // someone is in this tile.. but it's me..
        if (indexedTile.entities[entity.id] && indexedTile.getEntCount() === 1) {
            // do nothing, this is okay
        }
        else {
            return false;
        }
    }
    var tile = tileIdxMap[tileIdx].tile;
    return tile && tile.hasComponents(TRAVERSABLE_COMP);
}
export default isTraversable;
