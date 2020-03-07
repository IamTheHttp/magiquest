import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import {CHEST_SHAPE, CANVAS_OUTPUT} from 'gameEngine/gameConstants';
import Health from '../components/Health';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import sentryAnimations from 'gameEngine/entities/animations/sentryAnimations';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';

interface IChestConstructor {
  col: number,
  row: number,
  radius?: number,
  health?: number
}

class Chest extends BaseEntity {
  constructor({col, row, radius = 16, health = 1}: IChestConstructor) {
    super(Chest);
    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new Health(health, radius * 2, radius));

    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: CHEST_SHAPE,
        data: {}
      }]
    ));

    this.addComponent(new AnimationComp(sentryAnimations));
  }
}

export default Chest;

/**
 *TS2345: Argument of type '{ [x: string]:
 * { frames: { cropStartX: number; cropStartY: number; cropSizeX: number; cropSizeY: number; spriteURL: any; }[]; animationName: string; loops: boolean; }; }'
 * is not assignable to parameter of type
 * 'IAnimationMap'.   Index signatures are incompatible.     
 * Type '
 * { frames: { cropStartX: number; cropStartY: number; cropSizeX: number; cropSizeY: number; spriteURL: any; }[]; animationName: string; loops: boolean; }' is missing the following properties from type 'IAnimation': currentFrame, size, speed, realFrameCount, animationDuration
 */

