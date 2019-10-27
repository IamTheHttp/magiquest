import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import {ANIMATIONS, ATTACK_SPEEDS, CANVAS_OUTPUT, CIRCLE_SHAPE, HEALTH_BAR_SHAPE, PLAYER_CHAR} from '../gameConstants';
import AttackComponent from '../components/AttackComponent';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
import BackgroundComponent from '../components/BackgroundComponent';
import AnimationComp from 'components/AnimationComp';
import playerAnimations from 'entities/animations/playerAnimations';
import Health from 'components/Health';
import {attackSpeeds} from 'config';

class Player {
  constructor({x, y, radius = 16}) {
    let ent = new BaseEntity(Player);
    
    ent.addComponent(new MoveComponent(2));   // we move 32px, so it has to be divisible
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new AttackComponent(35, attackSpeeds[ATTACK_SPEEDS.FAST]));
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new Health(100));
    ent.addComponent(new UIComponent([
      {
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR
      },
      {
        name: CANVAS_OUTPUT,
        shape: HEALTH_BAR_SHAPE
      }]
    ));
    
    ent.addComponent(new AnimationComp(playerAnimations));
    
    return ent;
  }
}

export default Player;