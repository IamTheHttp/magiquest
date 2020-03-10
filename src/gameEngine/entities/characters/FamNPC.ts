import UIComponent from '../../components/UIComponent';
import PositionComponent from '../../components/PositionComponent';
import {AllowedUIShapes, CANVAS_OUTPUT} from 'gameEngine//gameConstants';
import BaseEntity from '../../BaseEntity';
import AnimationComp from 'components/AnimationComp';
import enemyAnimations from 'entities/animations/enemyAnimations';

interface IFamNPCConstructor {
  x: number;
  y: number;
  radius?: number;
  name: string;
}

class FamNPC extends BaseEntity {
  name:string;

  constructor({x, y, radius = 16, name}: IFamNPCConstructor) {
    super(FamNPC);
    // TODO change to ROW/COL
    this.addComponent(new PositionComponent({x, y, radius}));
    this.addComponent(new UIComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.PLAYER_CHAR,
        data: {}
      }]
    ));
  
    this.addComponent(new AnimationComp(enemyAnimations));
    this.name = name;
  }
}

export default FamNPC;