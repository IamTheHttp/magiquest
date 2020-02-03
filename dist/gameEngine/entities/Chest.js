var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import { CHEST_SHAPE, CANVAS_OUTPUT } from 'gameEngine/gameConstants';
import Health from '../components/Health';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import sentryAnimations from 'gameEngine/entities/animations/sentryAnimations';
import { getCenterPosOfGridIdx } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
var Chest = /** @class */ (function (_super) {
    __extends(Chest, _super);
    function Chest(_a) {
        var col = _a.col, row = _a.row, _b = _a.radius, radius = _b === void 0 ? 16 : _b, _c = _a.health, health = _c === void 0 ? 1 : _c;
        var _this = _super.call(this, Chest) || this;
        var _d = getCenterPosOfGridIdx(col, row), x = _d.x, y = _d.y;
        _this.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
        _this.addComponent(new Health(health));
        _this.addComponent(new UIComponent([{
                name: CANVAS_OUTPUT,
                shape: CHEST_SHAPE
            }]));
        _this.addComponent(new AnimationComp(sentryAnimations));
        return _this;
    }
    return Chest;
}(BaseEntity));
export default Chest;
