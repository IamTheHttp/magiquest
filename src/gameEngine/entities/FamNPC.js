import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import {CANVAS_OUTPUT, PLAYER_CHAR} from '../gameConstants';
import BaseEntity from '../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import sentryAnimations from 'entities/animations/sentryAnimations';

class FamNPC {
  constructor({x, y, radius = 16}) {
    let ent = new BaseEntity(FamNPC);
    ent.addComponent(new PositionComponent({x, y, radius}));
    ent.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: PLAYER_CHAR,
        rotation: -0.5 * Math.PI
      }]
    ));
  
    ent.addComponent(new AnimationComp(sentryAnimations));
    return ent;
  }
}

export default FamNPC;