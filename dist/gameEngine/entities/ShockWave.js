/**
 * Created by patrik.tolosa on 2019-10-23.

 */
import BaseEntity from 'gameEngine/BaseEntity';
import PositionComponent from 'gameEngine/components/PositionComponent';
import UIComponent from 'gameEngine/components/UIComponent';
import AnimationComp from 'gameEngine/components/AnimationComp';
import { bit } from 'gameEngine/config';
import { ARC_SHAPE } from 'gameEngine/gameConstants';
function getCenterPosOfTile(tileIdx) {
    var col = tileIdx.split('-')[0]; // TODO this is used elsewhere, we might want to put it as a function
    var row = tileIdx.split('-')[1];
    return {
        x: col * bit + bit / 2,
        y: row * bit + bit / 2
    };
}
var ShockWave = /** @class */ (function () {
    function ShockWave(_a) {
        var x = _a.x, y = _a.y, _b = _a.radius, radius = _b === void 0 ? 16 : _b, fromTileIdx = _a.fromTileIdx, toTileIdx = _a.toTileIdx, _c = _a.color, color = _c === void 0 ? 'red' : _c;
        var entity = new BaseEntity(ShockWave);
        entity.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
        entity.addComponent(new UIComponent());
        var origin = getCenterPosOfTile(fromTileIdx);
        var target = getCenterPosOfTile(toTileIdx);
        var deltaX = target.x - origin.x;
        var deltaY = target.y - origin.y;
        var direction;
        if (deltaX === 0) {
            direction = deltaY > 0 ? 0.5 : -0.5;
        }
        else if (deltaY === 0) {
            direction = deltaX > 0 ? 0 : 1;
        }
        else {
            direction = Math.atan(deltaY / deltaX);
        }
        var frames = [];
        var frameCount = 15;
        var animationDuration = 15;
        var i = 0;
        var sizeToGrow = 0.1;
        var radiusToGrow = 20;
        while (i < frameCount) {
            frames.push({
                shape: ARC_SHAPE,
                direction: direction,
                size: 0.2 + i * sizeToGrow / frameCount,
                radius: 16 + i * radiusToGrow / frameCount,
                x: origin.x,
                y: origin.y,
                color: color
            });
            i++;
        }
        entity.addComponent(new AnimationComp({
            SHOCKWAVE: {
                animationDuration: animationDuration,
                frames: frames,
                animationName: 'SHOCKWAVE',
                loops: false
            }
        }));
        entity.addAnimation(entity.getAnimationTypes().SHOCKWAVE);
        return entity;
    }
    return ShockWave;
}());
export default ShockWave;
