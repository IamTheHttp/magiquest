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
import MoveComponent from '../components/MoveComponent';
import { ATTACK_SPEEDS, CANVAS_OUTPUT, HEALTH_BAR_SHAPE } from 'gameEngine/gameConstants';
import Health from '../components/Health';
import AIControlledComp from '../components/AIControlledComp';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import sentryAnimations from 'gameEngine/entities/animations/sentryAnimations';
import AIVisionComponent from 'gameEngine/components/AIVisionComponent';
import AttackComponent from 'gameEngine/components/AttackComponent';
import { attackSpeeds } from 'gameEngine/config';
import { getCenterPosOfGridIdx } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
var Sentry = /** @class */ (function (_super) {
    __extends(Sentry, _super);
    function Sentry(_a) {
        var col = _a.col, row = _a.row, _b = _a.radius, radius = _b === void 0 ? 16 : _b, _c = _a.vision, vision = _c === void 0 ? 200 : _c, _d = _a.speed, speed = _d === void 0 ? 0.5 : _d, _e = _a.health, health = _e === void 0 ? 100 : _e, _f = _a.dmg, dmg = _f === void 0 ? 1 : _f;
        var _this = _super.call(this, Sentry) || this;
        var _g = getCenterPosOfGridIdx(col, row), x = _g.x, y = _g.y;
        _this.addComponent(new MoveComponent(speed));
        _this.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
        _this.addComponent(new Health(health));
        _this.addComponent(new AIVisionComponent(vision));
        _this.addComponent(new AttackComponent(dmg, attackSpeeds[ATTACK_SPEEDS.SLOW]));
        _this.addComponent(new AIControlledComp());
        _this.addComponent(new UIComponent([{
                name: CANVAS_OUTPUT,
                shape: HEALTH_BAR_SHAPE
            }]));
        _this.addComponent(new AnimationComp(sentryAnimations));
        return _this;
    }
    return Sentry;
}(BaseEntity));
export default Sentry;
