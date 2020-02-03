var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BACKGROUND_COMP, POSITION_COMP } from '../../../components/ComponentNamesConfig';
import { tileTypes } from 'gameEngine/config';
import filterOutFarEntities from '../filterOutFarEntities';
import { MAP_TILE_SHAPE } from 'gameEngine/gameConstants';
function renderBackgroundLayer(systemArguments) {
    var mapAPI = systemArguments.mapAPI, tileSetSprite = systemArguments.tileSetSprite, Entity = systemArguments.Entity;
    var allBackgroundEnts = Entity.getByComps([BACKGROUND_COMP]); // O1 fetching
    var closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);
    var _loop_1 = function (i) {
        var entity = closeBackgroundEnts[i];
        entity[BACKGROUND_COMP].sections.forEach(function (section) {
            if (section.shape === MAP_TILE_SHAPE) {
                // tile type
                mapAPI.addImage(__assign(__assign({ id: entity.id + "-" + i, image: tileSetSprite, x: entity[POSITION_COMP].x, y: entity[POSITION_COMP].y, height: entity[POSITION_COMP].height, width: entity[POSITION_COMP].width }, tileTypes[section.data.tileType]), { rotation: 0, layerName: 'background' }));
            }
        });
    };
    for (var i = 0; i < closeBackgroundEnts.length; i++) {
        _loop_1(i);
    }
}
export default renderBackgroundLayer;
