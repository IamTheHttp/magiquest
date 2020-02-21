import { POSITION_COMP } from '../../components/ComponentNamesConfig';
import { bit } from '../../config';
function filterOutFarEntities(systemArguments, entsToDraw) {
    var buffer = bit * 8;
    var mapAPI = systemArguments.mapAPI;
    var arr = [];
    var _a = mapAPI.getPan(), panX = _a.panX, panY = _a.panY;
    var _b = systemArguments.viewSize, viewWidth = _b.viewWidth, viewHeight = _b.viewHeight;
    for (var i = 0; i < entsToDraw.length; i++) {
        var entity = entsToDraw[i];
        var _c = entity[POSITION_COMP], x = _c.x, y = _c.y, radius = _c.radius, height = _c.height, width = _c.width;
        var entWidth = radius * 2 || width;
        var entHeight = radius * 2 || height;
        // Example
        // We have -100x, which means we move our view screen 100px to the right (the underlying is translated -100 px)
        // x = 0;
        // ent is 50px wide
        // buffer is 0
        // x + width + buffer = 50px;
        // since our view only starts from x = 100, our entity is out of view
        var isEntityTooFarLeft = x + entWidth + buffer < -panX;
        // Same calculation, only we need to take into account the width of what we show (viewWidth).
        // If the entity's X is 'more to the right' than our current pan + the entire view, it's out of view.
        var isEntityTooFarRight = x - entWidth - buffer > -panX + viewWidth;
        var isEntityTooFarUp = y + entHeight + buffer < -panY;
        var isEntityTooFarDown = y - entHeight - buffer > -panY + viewHeight;
        // is out of screen?
        if (isEntityTooFarLeft || isEntityTooFarRight || isEntityTooFarUp || isEntityTooFarDown) {
            // do nothing
        }
        else {
            arr.push(entity);
        }
    }
    return arr;
}
export default filterOutFarEntities;
