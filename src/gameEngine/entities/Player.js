import GAME_PLATFORM from 'game-platform/dist';
import {CANVAS, CIRCLE, MAP_TILE} from '../constants';
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';

let {Entity} = GAME_PLATFORM;

class Player {
  constructor({x, y, radius = 8}) {
    let ent = new Entity(Player);
    
    // TODO 16 should not be hard-coded
  
    ent.addComponent(new MoveComponent(5));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new UIComponent(
      [{
        name: CANVAS,
        shape: CIRCLE
      }]
    ));
    return ent;
  }
}

export default Player;