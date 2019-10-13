import GAME_PLATFORM from 'game-platform/dist';
import {ANIMATION_COMP, POSITION_COMP} from './components/ComponentNamesConfig';
import AnimationComp from './components/AnimationComp';



let {Entity} = GAME_PLATFORM;



class BaseEntity extends Entity {
  addAnimation(animation) {
    if (!this[ANIMATION_COMP]) {
      this.addComponent(new AnimationComp());
    }
    
    this[ANIMATION_COMP].addAnimationVariant(animation);
  }
  
  removeAnimation(animationName) {
    if (!this[ANIMATION_COMP]) {
      return;
    }
  
    delete this[ANIMATION_COMP].animations[animationName];
    
    if (Object.keys(this[ANIMATION_COMP].animations).length === 0) {
      this.removeComponent(ANIMATION_COMP);
    }
  }
  
  setDest({x, y}) {
    if (this[POSITION_COMP]) {
      x && (this[POSITION_COMP].destX = x);
      y && (this[POSITION_COMP].destY = y);
    }
  }
  
  getPos() {
    if (this[POSITION_COMP]) {
      return {
        x: this[POSITION_COMP].x,
        y: this[POSITION_COMP].y
      };
    };
  }
  
  moveUp() {
  
  }
  
  moveDown() {
  
  }
}

export {Entity};
export default BaseEntity;