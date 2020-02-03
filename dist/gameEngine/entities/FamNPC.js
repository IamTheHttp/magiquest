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
import { CANVAS_OUTPUT, PLAYER_CHAR } from 'gameEngine//gameConstants';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import sentryAnimations from 'gameEngine/entities/animations/sentryAnimations';
var FamNPC = /** @class */ (function (_super) {
    __extends(FamNPC, _super);
    function FamNPC(_a) {
        var x = _a.x, y = _a.y, _b = _a.radius, radius = _b === void 0 ? 16 : _b, name = _a.name;
        var _this = _super.call(this, FamNPC) || this;
        // TODO change to ROW/COL
        _this.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
        _this.addComponent(new UIComponent([{
                name: CANVAS_OUTPUT,
                shape: PLAYER_CHAR
            }]));
        _this.addComponent(new AnimationComp(sentryAnimations));
        _this.name = name;
        return _this;
    }
    return FamNPC;
}(BaseEntity));
export default FamNPC;
