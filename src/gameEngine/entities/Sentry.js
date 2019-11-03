import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import MoveComponent from '../components/MoveComponent';
import {ATTACK_SPEEDS, CANVAS_OUTPUT, CIRCLE_SHAPE, HEALTH_BAR_SHAPE, PLAYER_CHAR} from '../gameConstants';
import Health from '../components/Health';
import AIControlledComp from '../components/AIControlledComp';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import sentryAnimations from 'entities/animations/sentryAnimations';
import AIVisionComponent from 'components/AIVisionComponent';
import AttackComponent from 'components/AttackComponent';
import {attackSpeeds} from 'config';

class Sentry extends BaseEntity {
  /**
   *
   * @param x
   * @param y
   * @param radius
   * @param vision
   * @param speed
   * @param health
   * @param dmg
   * @return {Object} BaseEntity instance
   */
  constructor({x, y, radius = 16, vision = 200, speed = 0.5, health = 100, dmg = 10}) {
    super(Sentry);
    this.addComponent(new MoveComponent(speed));
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new Health(health));
    this.addComponent(new AIVisionComponent(vision));
    this.addComponent(new AttackComponent(dmg, attackSpeeds[ATTACK_SPEEDS.SLOW]));

    this.addComponent(new AIControlledComp());

    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: HEALTH_BAR_SHAPE
      }]
    ));

    this.addComponent(new AnimationComp(sentryAnimations));
  }
}

export default Sentry;