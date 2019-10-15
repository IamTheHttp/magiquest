import GAME_PLATFORM from 'game-platform/dist';
import {ANIMATION_COMP, IS_MOVING_COMP, POSITION_COMP} from './components/ComponentNamesConfig';
import AnimationComp from './components/AnimationComp';
import IsMoving from './components/IsMoving';
import {DIRECTIONS} from './constants';
import {bit} from './config';

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
      this[POSITION_COMP].destX = x;
      this[POSITION_COMP].destY = y;
    }
  }
  
  setMoveDirection(dir) {
    if (!this[IS_MOVING_COMP]) {
      this.addComponent(new IsMoving());
    }
    
    this[IS_MOVING_COMP].direction = dir;
  }
  
  getDest() {
    return {
      x: this[POSITION_COMP].destX,
      y: this[POSITION_COMP].destY
    };
  }
  
  stop() {
    this[POSITION_COMP].originX = null;
    this[POSITION_COMP].originY = null;
    this[POSITION_COMP].destX = null;
    this[POSITION_COMP].destY = null;
    this.removeComponent(IS_MOVING_COMP);
    this.setDest({
      x: null,
      y: null
    });
  }
  
  removeDirection() {
    if (this[IS_MOVING_COMP]) {
      this[IS_MOVING_COMP].direction = null;
    }
  }
  
  getMoveDirection() {
    return this[IS_MOVING_COMP] && this[IS_MOVING_COMP].direction;
  }
  
  setPos({x, y}) {
    this[POSITION_COMP].x = x;
    this[POSITION_COMP].y = y;
  }
  
  getPos() {
    if (this[POSITION_COMP]) {
      return {
        x: this[POSITION_COMP].x,
        y: this[POSITION_COMP].y
      };
    }
  }
  
  getDestFromDirection(dir) {
    let {x, y} = this.getPos();
  
    if (dir === DIRECTIONS.UP) {
      return {
        x,
        y: y - bit
      };
    }
    
    if (dir === DIRECTIONS.DOWN) {
      return {
        x,
        y: y + bit
      };
    }
    
    if (dir === DIRECTIONS.LEFT) {
      return {
        x: x - bit,
        y
      };
    }
    
    if (dir === DIRECTIONS.RIGHT) {
      return {
        x: x + bit,
        y
      };
    }
  }
  
  setDestTo(dir) {
    let {x, y} = this.getPos();
    this[POSITION_COMP].originX = x;
    this[POSITION_COMP].originY = y;
    this[POSITION_COMP].ORIENTATION = dir;
    
    if (dir === DIRECTIONS.UP) {
      this.setDest({
        x,
        y: y - bit
      });
    }
    
    if (dir === DIRECTIONS.DOWN) {
      this.setDest({
        x,
        y: y + bit
      });
    }
    
    if (dir === DIRECTIONS.LEFT) {
      this.setDest({
        x: x - bit,
        y
      });
    }
    
    if (dir === DIRECTIONS.RIGHT) {
      this.setDest({
        x: x + bit,
        y
      });
    }
  }
}

export {Entity};
export default BaseEntity;