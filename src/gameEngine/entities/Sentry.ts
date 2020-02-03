import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import MoveComponent from '../components/MoveComponent';
import {ATTACK_SPEEDS, CANVAS_OUTPUT, CIRCLE_SHAPE, HEALTH_BAR_SHAPE, PLAYER_CHAR} from 'gameEngine/gameConstants';
import Health from '../components/Health';
import AIControlledComp from '../components/AIControlledComp';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import sentryAnimations from 'gameEngine/entities/animations/sentryAnimations';
import AIVisionComponent from 'gameEngine/components/AIVisionComponent';
import AttackComponent from 'gameEngine/components/AttackComponent';
import {attackSpeeds} from 'gameEngine/config';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';

class Sentry extends BaseEntity {
  constructor({col, row, radius = 16, vision = 200, speed = 0.5, health = 100, dmg = 1}) {
    super(Sentry);
    let {x, y} = getCenterPosOfGridIdx(col, row);

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