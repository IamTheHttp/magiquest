import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import {ANIMATIONS, CANVAS_OUTPUT, CIRCLE_SHAPE, PLAYER_CHAR} from '../constants';
import AttackComponent from '../components/AttackComponent';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
import {animationTypes} from '../config';
import BackgroundComponent from '../components/BackgroundComponent';

class Player {
  constructor({x, y, radius = 16}) {
    let ent = new BaseEntity(Player);
    
    ent.addComponent(new MoveComponent(2));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new AttackComponent(35));
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new UIComponent([
      {
        name: CANVAS_OUTPUT,
        shape: CIRCLE_SHAPE
      },
      {
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR
      }]
    ));
    
    ent.addAnimation(animationTypes[ANIMATIONS.IDLE]);
    
    return ent;
  }
}

export default Player;