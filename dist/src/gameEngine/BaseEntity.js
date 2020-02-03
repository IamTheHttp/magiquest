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
import GAME_PLATFORM from 'game-platform/dist';
import { AI_VISION_COMP, ANIMATION_COMP, HEALTH_COMP, IS_ATTACKING_COMP, IS_MOVING_COMP, MOVEMENT_COMP, PLAYER_CONTROLLED_COMP, POSITION_COMP } from './components/ComponentNamesConfig';
import IsMoving from './components/IsMoving';
import { DIRECTIONS } from 'gameEngine/gameConstants';
import { bit } from 'gameEngine/config';
var Entity = GAME_PLATFORM.Entity;
var BaseEntity = /** @class */ (function (_super) {
    __extends(BaseEntity, _super);
    function BaseEntity(entity) {
        return _super.call(this, entity) || this;
    }
    BaseEntity.prototype.addAnimation = function (animation) {
        this[ANIMATION_COMP].addAnimationVariant(animation);
    };
    BaseEntity.prototype.isPlayer = function () {
        return !!this[PLAYER_CONTROLLED_COMP];
    };
    BaseEntity.prototype.clearAllAnimations = function () {
        if (!this[ANIMATION_COMP]) {
            return;
        }
        this[ANIMATION_COMP].animations = {};
    };
    BaseEntity.prototype.calcOrientation = function (destX, destY) {
        var _a = this.getPos(), x = _a.x, y = _a.y;
        if (destX > x) {
            return DIRECTIONS.RIGHT;
        }
        else if (destX < x) {
            return DIRECTIONS.LEFT;
        }
        else if (destY > y) {
            return DIRECTIONS.DOWN;
        }
        else if (destY < y) {
            return DIRECTIONS.UP;
        }
        else {
            return this.getOrientation(); // by default, get current one
        }
    };
    BaseEntity.prototype.getAnimations = function () {
        return (this[ANIMATION_COMP] && this[ANIMATION_COMP].animations) || {};
    };
    BaseEntity.prototype.getAnimationTypes = function () {
        return this[ANIMATION_COMP] && this[ANIMATION_COMP].animationTypes;
    };
    BaseEntity.prototype.hasSpecificAnimation = function (name) {
        return !!this.getAnimations()[name];
    };
    BaseEntity.prototype.getMovementSpeed = function () {
        return this[MOVEMENT_COMP] && this[MOVEMENT_COMP].speed;
    };
    BaseEntity.prototype.removeAnimation = function (animationName) {
        if (!this[ANIMATION_COMP]) {
            return;
        }
        delete this[ANIMATION_COMP].animations[animationName];
    };
    BaseEntity.prototype.getAIVisionRange = function () {
        return this[AI_VISION_COMP] && this[AI_VISION_COMP].range;
    };
    BaseEntity.prototype.isAttacking = function () {
        return !!this[IS_ATTACKING_COMP];
    };
    BaseEntity.prototype.isAttackable = function () {
        return !!this[HEALTH_COMP];
    };
    BaseEntity.prototype.setDest = function (_a) {
        var x = _a.x, y = _a.y;
        if (this[POSITION_COMP]) {
            this[POSITION_COMP].destX = x;
            this[POSITION_COMP].destY = y;
        }
    };
    BaseEntity.prototype.setMoveDirection = function (dir) {
        if (!this[IS_MOVING_COMP]) {
            this.addComponent(new IsMoving());
        }
        this[IS_MOVING_COMP].direction = dir;
    };
    BaseEntity.prototype.getDest = function () {
        return {
            x: this[POSITION_COMP].destX,
            y: this[POSITION_COMP].destY
        };
    };
    BaseEntity.prototype.stop = function () {
        this[POSITION_COMP].originX = null;
        this[POSITION_COMP].originY = null;
        this.removeComponent(IS_MOVING_COMP);
        this.setDest({
            x: null,
            y: null
        });
    };
    BaseEntity.prototype.removeDirection = function () {
        if (this[IS_MOVING_COMP]) {
            this[IS_MOVING_COMP].direction = null;
        }
    };
    BaseEntity.prototype.getMoveDirection = function () {
        return this[IS_MOVING_COMP] && this[IS_MOVING_COMP].direction;
    };
    BaseEntity.prototype.setOrientation = function (direction) {
        this[POSITION_COMP].orientation = direction;
    };
    BaseEntity.prototype.getOrientation = function () {
        return this[POSITION_COMP].orientation;
    };
    BaseEntity.prototype.isMoving = function () {
        return this[IS_MOVING_COMP];
    };
    BaseEntity.prototype.setPos = function (_a) {
        var x = _a.x, y = _a.y;
        this[POSITION_COMP].x = x;
        this[POSITION_COMP].y = y;
    };
    BaseEntity.prototype.getPos = function () {
        if (this[POSITION_COMP]) {
            return {
                x: this[POSITION_COMP].x,
                y: this[POSITION_COMP].y
            };
        }
    };
    BaseEntity.prototype.getDestFromDirection = function (dir) {
        var _a = this.getPos(), x = _a.x, y = _a.y;
        if (dir === DIRECTIONS.UP) {
            return {
                x: x,
                y: y - bit
            };
        }
        if (dir === DIRECTIONS.DOWN) {
            return {
                x: x,
                y: y + bit
            };
        }
        if (dir === DIRECTIONS.LEFT) {
            return {
                x: x - bit,
                y: y
            };
        }
        if (dir === DIRECTIONS.RIGHT) {
            return {
                x: x + bit,
                y: y
            };
        }
    };
    BaseEntity.prototype.setDestTo = function (dir) {
        var _a = this.getPos(), x = _a.x, y = _a.y;
        this[POSITION_COMP].originX = x;
        this[POSITION_COMP].originY = y;
        if (dir === DIRECTIONS.UP) {
            this.setDest({
                x: x,
                y: y - bit
            });
        }
        if (dir === DIRECTIONS.DOWN) {
            this.setDest({
                x: x,
                y: y + bit
            });
        }
        if (dir === DIRECTIONS.LEFT) {
            this.setDest({
                x: x - bit,
                y: y
            });
        }
        if (dir === DIRECTIONS.RIGHT) {
            this.setDest({
                x: x + bit,
                y: y
            });
        }
    };
    BaseEntity.prototype.isDestReached = function () {
        var xReached = this.getPos().x === this.getDest().x;
        var yReached = this.getPos().y === this.getDest().y;
        return xReached && yReached;
    };
    return BaseEntity;
}(Entity));
export { Entity };
export default BaseEntity;
