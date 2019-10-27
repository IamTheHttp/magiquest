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

class Sentry {
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
    let ent = new BaseEntity(Sentry);
    
    ent.addComponent(new MoveComponent(speed));
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new Health(health));
    ent.addComponent(new AIVisionComponent(vision));
    ent.addComponent(new AttackComponent(dmg, attackSpeeds[ATTACK_SPEEDS.SLOW]));
  
    ent.addComponent(new AIControlledComp());
    
    ent.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: HEALTH_BAR_SHAPE
      }]
    ));
  
    ent.addComponent(new AnimationComp(sentryAnimations));
    return ent;
  }
}

export default Sentry;