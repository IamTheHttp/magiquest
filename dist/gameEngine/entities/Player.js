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
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import { ATTACK_SPEEDS, CANVAS_OUTPUT, HEALTH_BAR_SHAPE, PLAYER_CHAR } from 'gameEngine/gameConstants';
import AttackComponent from '../components/AttackComponent';
import BaseEntity from 'gameEngine/BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import playerAnimations from 'gameEngine/entities/animations/playerAnimations';
import Health from 'gameEngine/components/Health';
import { attackSpeeds } from 'gameEngine/config';
import { getCenterPosOfGridIdx } from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(_a) {
        var _b = _a.radius, radius = _b === void 0 ? 16 : _b, col = _a.col, row = _a.row;
        var _this = _super.call(this, Player) || this;
        var _c = getCenterPosOfGridIdx(col, row), x = _c.x, y = _c.y;
        _this.addComponent(new MoveComponent(2)); // we move 32px, so it has to be divisible
        _this.addComponent(new PlayerControlledComponent());
        _this.addComponent(new AttackComponent(35, attackSpeeds[ATTACK_SPEEDS.FAST]));
        _this.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
        _this.addComponent(new Health(100));
        _this.addComponent(new UIComponent([
            {
                name: CANVAS_OUTPUT,
                shape: PLAYER_CHAR
            },
            {
                name: CANVAS_OUTPUT,
                shape: HEALTH_BAR_SHAPE
            }
        ]));
        _this.addComponent(new AnimationComp(playerAnimations));
        _this.name = 'Jenny';
        return _this;
    }
    return Player;
}(BaseEntity));
export default Player;
