import GAME_PLATFORM from 'game-platform/dist';
import {
  ANIMATION_COMP,
  IS_MOVING_COMP,
  MOVEMENT_COMP,
  PLAYER_CONTROLLED_COMP,
  POSITION_COMP
} from './components/ComponentNamesConfig';
import AnimationComp from './components/AnimationComp';
import IsMoving from './components/IsMoving';
import {DIRECTIONS} from './gameConstants';
import {bit} from 'config';

let {Entity} = GAME_PLATFORM;

class BaseEntity extends Entity {
  addAnimation(animation) {
    this[ANIMATION_COMP].addAnimationVariant(animation);
  }
  
  isPlayer() {
    return !!this[PLAYER_CONTROLLED_COMP];
  }
  
  clearAllAnimations() {
    if (!this[ANIMATION_COMP]) {
      return;
    }
  
    this[ANIMATION_COMP].animations = {};
  }
  
  
  getAnimations() {
    return (this[ANIMATION_COMP] && this[ANIMATION_COMP].animations) || {};
  }
  
  getAnimationTypes() {
    return this[ANIMATION_COMP] && this[ANIMATION_COMP].animationTypes;
  }
  
  hasSpecificAnimation(name) {
    return !!this.getAnimations()[name];
  }
  
  getMovementSpeed() {
    return this[MOVEMENT_COMP] && this[MOVEMENT_COMP].speed;
  }
  
  removeAnimation(animationName) {
    if (!this[ANIMATION_COMP]) {
      return;
    }
    
    delete this[ANIMATION_COMP].animations[animationName];
  
    // TODO - we're now saving some configuration on ANIMATION_COMP so we can't delete it
    // TODO - can we still remove the component? it's a waste to keep it if we don't need it
    // if (Object.keys(this[ANIMATION_COMP].animations).length === 0) {
    //   this.removeComponent(ANIMATION_COMP);
    // }
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
  
  setOrientation(direction) {
    this[POSITION_COMP].orientation = direction;
  }
  
  isMoving() {
    return this[IS_MOVING_COMP];
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
  
  isDestReached() {
    let xReached = this.getPos().x === this.getDest().x;
    let yReached = this.getPos().y === this.getDest().y;
    return xReached && yReached;
  }
}

export {Entity};
export default BaseEntity;