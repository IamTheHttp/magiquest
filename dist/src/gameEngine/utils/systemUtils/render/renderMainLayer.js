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
import { DIALOG_COMP, POSITION_COMP, UI_COMP } from 'gameEngine/components/ComponentNamesConfig';
import { CIRCLE_SHAPE, DIRECTIONS, HEALTH_BAR_SHAPE, PLAYER_CHAR, CHEST_SHAPE } from '../../../gameConstants';
import renderCircle from './renderCircle';
import renderHealthBar from './renderHealthBar';
import { bit } from '../../../config';
import char from 'assets/characters.png';
import misc from 'assets/misc.png';
import getSpriteCrop from 'gameEngine/utils/getSpriteCrop';
import renderAnimations from 'gameEngine/utils/systemUtils/render/renderAnimations';
import { assetLoader } from 'cache/assetLoader';
import renderDialog from 'gameEngine/utils/systemUtils/render/renderDialog';
import { Entity } from 'gameEngine/BaseEntity';
function renderMainLayer(systemArguments, closeEnts, closeEntsWithAnimation) {
    var mapAPI = systemArguments.mapAPI;
    var _loop_1 = function (i) {
        var entity_1 = closeEnts[i];
        entity_1[UI_COMP].sections.forEach(function (section) {
            var _a;
            if (section.shape === CIRCLE_SHAPE) {
                renderCircle(systemArguments, entity_1);
            }
            if (section.shape === HEALTH_BAR_SHAPE) {
                renderHealthBar(systemArguments, entity_1);
            }
            if (section.shape === CHEST_SHAPE) {
                var crops = {
                    cropStartX: 32,
                    cropStartY: 0
                };
                var _b = entity_1[POSITION_COMP], radius = _b.radius, x = _b.x, y = _b.y;
                // When the player is out of animation phase, this is what we show
                mapAPI.addImage(__assign(__assign({ id: "" + entity_1.id, image: assetLoader.getAsset(misc), x: x - radius, y: y - radius, height: 32, width: 32 }, crops), { cropSizeX: bit, cropSizeY: bit, rotation: section.rotation || 0 // in radians
                 }));
            }
            if (section.shape === PLAYER_CHAR) {
                var spriteCrop = (_a = {},
                    _a[DIRECTIONS.LEFT] = getSpriteCrop(1, 1),
                    _a[DIRECTIONS.RIGHT] = getSpriteCrop(1, 0),
                    _a[DIRECTIONS.UP] = getSpriteCrop(1, 3),
                    _a[DIRECTIONS.DOWN] = getSpriteCrop(1, 2),
                    _a);
                var crops = spriteCrop[entity_1.getOrientation()] || {
                    cropStartX: 0,
                    cropStartY: 0
                };
                var _c = entity_1[POSITION_COMP], radius = _c.radius, x = _c.x, y = _c.y;
                // When the player is out of animation phase, this is what we show
                mapAPI.addImage(__assign(__assign({ id: "" + entity_1.id, image: assetLoader.getAsset(char), x: x - radius, y: y - radius, height: 32, width: 32 }, crops), { cropSizeX: bit, cropSizeY: bit, rotation: section.rotation || 0 // in radians
                 }));
            }
        });
    };
    // render entities
    for (var i = 0; i < closeEnts.length; i++) {
        _loop_1(i);
    }
    // render animations
    for (var i = 0; i < closeEntsWithAnimation.length; i++) {
        var entity_2 = closeEntsWithAnimation[i];
        renderAnimations(systemArguments, entity_2);
    }
    // one dialog at a time!
    var entity = Entity.getByComps(DIALOG_COMP)[0];
    if (entity) {
        renderDialog(systemArguments, entity);
        systemArguments.game.stop();
        entity.removeComponent(DIALOG_COMP);
    }
}
export default renderMainLayer;
