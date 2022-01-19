// row 0 right
// row 1 left
// row 2 up
// row 3 down
// all animations have 4 frames

import {ANIMATIONS} from '../../gameConstants';
import {getSpriteCrop} from '../../utils/getSpriteCrop';

/**
 * @param {string} charSpriteURL
 */
function commonAnimations(charSpriteURL: string) {
  return {
    [ANIMATIONS.MOVE_RIGHT]: {
      frames: [
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(0, 0)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(1, 0)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(2, 0)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(3, 0)
        }
      ],
      animationName: ANIMATIONS.MOVE_RIGHT,
      loops: false
    },
    [ANIMATIONS.MOVE_LEFT]: {
      frames: [
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(0, 1)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(1, 1)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(2, 1)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(3, 1)
        }
      ],
      animationName: ANIMATIONS.MOVE_LEFT,
      loops: false
    },
    [ANIMATIONS.MOVE_UP]: {
      frames: [
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(0, 3)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(1, 3)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(2, 3)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(3, 3)
        }
      ],
      animationName: ANIMATIONS.MOVE_UP,
      loops: false
    },
    [ANIMATIONS.MOVE_DOWN]: {
      frames: [
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(0, 2)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(1, 2)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(2, 2)
        },
        {
          spriteURL: charSpriteURL,
          ...getSpriteCrop(3, 2)
        }
      ],
      animationName: ANIMATIONS.MOVE_DOWN,
      loops: false
    }
  };
}

export default commonAnimations;
