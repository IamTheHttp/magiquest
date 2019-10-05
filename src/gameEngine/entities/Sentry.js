import GAME_PLATFORM from 'game-platform/dist';
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import {CANVAS_OUTPUT, CIRCLE_SHAPE, HEALTH_BAR_SHAPE} from '../constants';
import Health from '../components/Health';
import AIControlledComp from '../components/AIControlledComp';

let {Entity} = GAME_PLATFORM;

class Sentry {
  constructor({x, y, radius = 8}) {
    let ent = new Entity(Sentry);
    
    ent.addComponent(new MoveComponent(1));
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new Health(100));
  
    ent.addComponent(new AIControlledComp());
    
    ent.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: CIRCLE_SHAPE
      },
      {
        name: CANVAS_OUTPUT,
        shape: HEALTH_BAR_SHAPE
      }]
    ));
    return ent;
  }
}

export default Sentry;