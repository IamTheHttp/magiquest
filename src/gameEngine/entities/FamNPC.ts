import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import {CANVAS_OUTPUT, PLAYER_CHAR} from 'gameEngine//gameConstants';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'gameEngine/components/AnimationComp';
import sentryAnimations from 'gameEngine/entities/animations/sentryAnimations';

class FamNPC extends BaseEntity {
  name:string;

  constructor({x, y, radius = 16, name}) {
    super(FamNPC);
    // TODO change to ROW/COL
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR
      }]
    ));
  
    this.addComponent(new AnimationComp(sentryAnimations));
    this.name = name;
  }
}

export default FamNPC;