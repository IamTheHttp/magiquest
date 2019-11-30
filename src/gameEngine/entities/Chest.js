import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import {CHEST_SHAPE, CANVAS_OUTPUT} from '../gameConstants';
import Health from '../components/Health';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import sentryAnimations from 'entities/animations/sentryAnimations';
import {getCenterPosOfGridIdx} from 'utils/componentUtils/positionUtils/getCenterPosOfGridIdx';

class Chest extends BaseEntity {
  /**
   *
   * @param x
   * @param y
   * @param radius
   * @param health 
   * @return {Object} BaseEntity instance
   */

  constructor({col, row, radius = 16, health = 1}) {
    super(Chest);
    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new Health(health));

    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: CHEST_SHAPE
      }]
    ));

    this.addComponent(new AnimationComp(sentryAnimations));
  }
}

export default Chest;