import {ANIMATIONS} from 'gameEngine/gameConstants';
import charImageURL from 'assets/sentry.png';
import getSpriteCrop from 'gameEngine/utils/getSpriteCrop';

const enemyAnimations = {
  [ANIMATIONS.MOVE_RIGHT]: {
    frames: [
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(0, 0)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(1, 0)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(2, 0)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(3, 0)
      }
    ],
    animationName: ANIMATIONS.MOVE_RIGHT,
    loops: false
  },
  [ANIMATIONS.MOVE_LEFT]: {
    frames: [
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(0, 1)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(1, 1)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(2, 1)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(3, 1)
      }
    ],
    animationName: ANIMATIONS.MOVE_LEFT,
    loops: false
  },
  [ANIMATIONS.MOVE_UP]: {
    frames: [
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(0, 3)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(1, 3)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(2, 3)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(3, 3)
      }
    ],
    animationName: ANIMATIONS.MOVE_UP,
    loops: false
  },
  [ANIMATIONS.MOVE_DOWN]: {
    frames: [
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(0, 2)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(1, 2)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(2, 2)
      },
      {
        spriteURL: charImageURL,
        ...getSpriteCrop(3, 2)
      }
    ],
    animationName: ANIMATIONS.MOVE_DOWN,
    loops: false
  }
};

export default enemyAnimations;