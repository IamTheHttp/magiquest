import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import PlayerControlledComponent from '../components/PlayerControlledComponent';
import MoveComponent from '../components/MoveComponent';
import {ANIMATIONS, CANVAS_OUTPUT, CIRCLE_SHAPE, HEALTH_BAR_SHAPE, PLAYER_CHAR} from 'gameEngine/gameConstants';
import AttackComponent from '../components/AttackComponent';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import playerAnimations from 'gameEngine/entities/animations/playerAnimations';
import Health from 'gameEngine/components/Health';
import {ATTACK_SPEEDS_OPTIONS, attackSpeeds, bit} from 'gameEngine/config';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';


interface IPlayerConstructor {
  radius?:number;
  col:number;
  row:number;
}

class Player extends BaseEntity {
  constructor({radius = 16, col, row}: IPlayerConstructor) {
    super(Player);
    let {x, y} = getCenterPosOfGridIdx(col, row);

    this.addComponent(new MoveComponent(2));   // we move 32px, so it has to be divisible
    this.addComponent(new PlayerControlledComponent());

    this.addComponent(new AttackComponent(35, attackSpeeds[ATTACK_SPEEDS_OPTIONS.FAST]));
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new Health(100, radius * 2, radius));
    this.addComponent(new UIComponent([
      {
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR,
        data: {}
      },
      {
        name: CANVAS_OUTPUT,
        shape: HEALTH_BAR_SHAPE,
        data: {}
      }]
    ));

    this.addComponent(new AnimationComp(playerAnimations));
    this.name = 'Jenny';
  }
}

export default Player;