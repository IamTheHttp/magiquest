import GAME_PLATFORM from 'game-platform/dist';
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import {CANVAS_OUTPUT, CIRCLE_SHAPE} from '../constants';
import AttackComponent from '../components/AttackComponent';

let {Entity} = GAME_PLATFORM;

class Player {
  constructor({x, y, radius = 16}) {
    let ent = new Entity(Player);
    
    // TODO 16 should not be hard-coded
  
    ent.addComponent(new MoveComponent(2));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new AttackComponent(35));
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