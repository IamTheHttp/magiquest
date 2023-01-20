// row 0 right
// row 1 left
// row 2 up
// row 3 down
// all animations have 4 frames

import {ANIMATIONS, TILE_SIZE} from '../../gameConstants';
import {getSpriteCrop} from '../../utils/getSpriteCrop';
import {IAnimationDefinitionMap} from '../../components/AnimationComp';

/**
 * Create move animations based on a sprite URL.
 * Requires movement speed to determine animation duration
 * @param charSpriteURL
 * @param movementSpeed
 */
export function commonMoveAnimations(charSpriteURL: string, movementSpeed: number): IAnimationDefinitionMap {
  const ticksToCrossTile = TILE_SIZE / movementSpeed;
  return {
    [ANIMATIONS.MOVE_RIGHT]: {
      animationName: ANIMATIONS.MOVE_RIGHT,
      loops: false,
      animationDurationInTicks: ticksToCrossTile,
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
      ]
    },
    [ANIMATIONS.MOVE_LEFT]: {
      animationName: ANIMATIONS.MOVE_LEFT,
      loops: false,
      animationDurationInTicks: ticksToCrossTile,
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
      ]
    },
    [ANIMATIONS.MOVE_UP]: {
      animationName: ANIMATIONS.MOVE_UP,
      loops: false,
      animationDurationInTicks: ticksToCrossTile,
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
      ]
    },
    [ANIMATIONS.MOVE_DOWN]: {
      animationName: ANIMATIONS.MOVE_DOWN,
      loops: false,
      animationDurationInTicks: ticksToCrossTile,
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
      ]
    }
  };
}
