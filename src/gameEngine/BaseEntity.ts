import GAME_PLATFORM from 'game-platform';
import {
  AI_VISION_COMP,
  ANIMATION_COMP, HEALTH_COMP, IS_ATTACKING_COMP,
  IS_MOVING_COMP,
  MOVEMENT_COMP,
  PLAYER_CONTROLLED_COMP,
  POSITION_COMP
} from './components/ComponentNamesConfig';
import AnimationComp from './components/AnimationComp';
import IsMoving from './components/IsMoving';
import {DIRECTIONS} from 'gameEngine/gameConstants';
import {bit} from 'gameEngine/config';
import AIVisionComponent from 'gameEngine/components/AIVisionComponent';
import Health from "components/Health";

let {Entity} = GAME_PLATFORM;


class BaseEntity extends Entity {
  id: number;
  components: object; // TODO this should be extended from Entity
  [HEALTH_COMP]: Health;
  constructor(entity: any) {
    super(entity);
  }

  removeComponent: (compName: string) => any; // TODO find all ANY and deal with them
  addComponent: (comp: object) => any;

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

  calcOrientation(destX, destY) {
    let {x, y} = this.getPos();

    if (destX > x) {
      return DIRECTIONS.RIGHT;
    } else if (destX < x) {
      return DIRECTIONS.LEFT;
    } else if (destY > y) {
      return DIRECTIONS.DOWN;
    } else if (destY < y) {
      return DIRECTIONS.UP;
    } else {
      return this.getOrientation(); // by default, get current one
    }
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
  }

  getAIVisionRange() {
    return this[AI_VISION_COMP] && this[AI_VISION_COMP].range;
  }

  isAttacking() {
    return !!this[IS_ATTACKING_COMP];
  }

  isAttackable() {
    return !!this[HEALTH_COMP];
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

  getOrientation() {
    return this[POSITION_COMP].orientation;
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