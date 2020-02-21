var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ANIMATION_COMP } from 'gameEngine/components/ComponentNamesConfig';
import assertType from 'gameEngine/utils/assertType';
var AnimationComp = /** @class */ (function () {
    function AnimationComp(animationTypes) {
        this.name = ANIMATION_COMP;
        this.animations = {};
        this.animationTypes = animationTypes;
    }
    AnimationComp.prototype.addAnimationVariant = function (_a) {
        if (_a === void 0) { _a = {}; }
        var _b = _a.animationName, animationName = _b === void 0 ? '' : _b, _c = _a.frames, frames = _c === void 0 ? [] : _c, _d = _a.loops, loops = _d === void 0 ? false : _d, _e = _a.size, size = _e === void 0 ? 0.25 : _e, _f = _a.speed, speed = _f === void 0 ? 1 : _f, _g = _a.animationDuration, animationDuration = _g === void 0 ? 0 : _g, rest = __rest(_a, ["animationName", "frames", "loops", "size", "speed", "animationDuration"]);
        assertType(animationName, 'Name of animation', 'string');
        if (Object.keys(rest).length > 0) {
            throw "Extra arguments not supported to addAnimationVariant " + JSON.stringify(Object.keys(rest));
        }
        this.animations[animationName] = {
            animationName: animationName,
            frames: frames,
            currentFrame: 0,
            loops: loops,
            size: size,
            speed: speed,
            realFrameCount: 0,
            animationDuration: animationDuration
        };
    };
    ;
    return AnimationComp;
}());
export default AnimationComp;
