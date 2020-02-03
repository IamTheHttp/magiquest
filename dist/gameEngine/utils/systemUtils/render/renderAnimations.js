import { ANIMATION_COMP, POSITION_COMP } from '../../../components/ComponentNamesConfig';
import { ARC_SHAPE } from '../../../gameConstants';
import { assetLoader } from 'cache/assetLoader';
import { ATTACK_CONFIG, bit } from 'gameEngine/config';
function renderAnimations(systemArguments, entity) {
    var mapAPI = systemArguments.mapAPI;
    for (var anim in entity.getAnimations()) {
        var _a = entity[ANIMATION_COMP].animations[anim], currentFrame = _a.currentFrame, frames_1 = _a.frames;
        var frame = frames_1[currentFrame];
        if (frame.spriteURL) {
            mapAPI.addImage({
                id: "" + entity.id,
                image: assetLoader.getAsset(frame.spriteURL),
                x: entity[POSITION_COMP].x - entity[POSITION_COMP].radius,
                y: entity[POSITION_COMP].y - entity[POSITION_COMP].radius,
                height: bit,
                width: bit,
                cropStartX: frame.cropStartX,
                cropStartY: frame.cropStartY,
                cropSizeX: bit,
                cropSizeY: bit,
                rotation: 0 // in radians
            });
        }
        if (frame.shape === ARC_SHAPE) {
            // we either render the X of the entity, or the animation X provided...
            var frameX = frame.x;
            var frameY = frame.y;
            var entityX = entity[POSITION_COMP].x - entity[POSITION_COMP].radius;
            var entityY = entity[POSITION_COMP].y - entity[POSITION_COMP].radius;
            mapAPI.addArc({
                id: "" + entity.id,
                x: frameX,
                y: frameY,
                radius: frame.radius,
                size: frame.size,
                direction: frame.direction,
                lineWidth: ATTACK_CONFIG.lineWidth,
                color: frame.color
            });
        }
    }
}
export default renderAnimations;
