import GAME_PLATFORM from 'game-platform/dist';
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import {CANVAS_OUTPUT, CIRCLE_SHAPE} from '../constants';

let {Entity} = GAME_PLATFORM;

class Player {
  constructor({x, y, radius = 8}) {
    let ent = new Entity(Player);
    
    // TODO 16 should not be hard-coded
  
    ent.addComponent(new MoveComponent(4));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: CIRCLE_SHAPE
      }]
    ));
    return ent;
  }
}

export default Player;