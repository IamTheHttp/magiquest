import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import {CANVAS_OUTPUT, PLAYER_CHAR} from '../gameConstants';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import sentryAnimations from 'entities/animations/sentryAnimations';

class FamNPC extends BaseEntity {
  constructor({x, y, radius = 16, name}) {
    super(FamNPC);
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR
      }]
    ));
  
    this.addComponent(new AnimationComp(sentryAnimations));
    this.name = name; // TODO - should this be wrapped in a component?
  }
}

export default FamNPC;