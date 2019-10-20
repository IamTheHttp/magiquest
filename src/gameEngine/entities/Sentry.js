import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import MoveComponent from '../components/MoveComponent';
import {CANVAS_OUTPUT, CIRCLE_SHAPE, HEALTH_BAR_SHAPE, PLAYER_CHAR} from '../gameConstants';
import Health from '../components/Health';
import AIControlledComp from '../components/AIControlledComp';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import sentryAnimations from 'entities/animations/sentryAnimations';

class Sentry {
  constructor({x, y, radius = 16}) {
    let ent = new BaseEntity(Sentry);
    
    ent.addComponent(new MoveComponent(0.47));
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new Health(100));
  
    ent.addComponent(new AIControlledComp());
    
    ent.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR
      },
      {
        name: CANVAS_OUTPUT,
        shape: HEALTH_BAR_SHAPE
      }]
    ));
  
    ent.addComponent(new AnimationComp(sentryAnimations));
    return ent;
  }
}

export default Sentry;