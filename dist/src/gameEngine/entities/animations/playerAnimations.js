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
var _a;
import { ANIMATIONS } from 'gameEngine/gameConstants';
import charImageURL from 'assets/characters.png';
import getSpriteCrop from 'gameEngine/utils/getSpriteCrop';
var playerAnimations = (_a = {},
    _a[ANIMATIONS.MOVE_RIGHT] = {
        frames: [
            __assign({ spriteURL: charImageURL }, getSpriteCrop(0, 0)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(1, 0)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(2, 0)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(3, 0))
        ],
        animationName: ANIMATIONS.MOVE_RIGHT,
        loops: false
    },
    _a[ANIMATIONS.MOVE_LEFT] = {
        frames: [
            __assign({ spriteURL: charImageURL }, getSpriteCrop(0, 1)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(1, 1)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(2, 1)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(3, 1))
        ],
        animationName: ANIMATIONS.MOVE_LEFT,
        loops: false
    },
    _a[ANIMATIONS.MOVE_UP] = {
        frames: [
            __assign({ spriteURL: charImageURL }, getSpriteCrop(0, 3)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(1, 3)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(2, 3)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(3, 3))
        ],
        animationName: ANIMATIONS.MOVE_UP,
        loops: false
    },
    _a[ANIMATIONS.MOVE_DOWN] = {
        frames: [
            __assign({ spriteURL: charImageURL }, getSpriteCrop(0, 2)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(1, 2)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(2, 2)),
            __assign({ spriteURL: charImageURL }, getSpriteCrop(3, 2))
        ],
        animationName: ANIMATIONS.MOVE_DOWN,
        loops: false
    },
    _a);
export default playerAnimations;
