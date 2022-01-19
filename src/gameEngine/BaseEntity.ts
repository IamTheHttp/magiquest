import {Entity} from 'game-platform';
import {
  AI_VISION_COMP,
  ANIMATION_COMP,
  ATTACK_COMP,
  BACKGROUND_COMP,
  CAN_ASSIGN_QUESTS_COMP,
  CAN_SPAWN_COMP,
  DIALOG_COMP,
  HAS_ACTION_SIGN_COMP,
  HEALTH_COMP,
  IS_ATTACKING_COMP,
  IS_MOVING_COMP,
  MOVEMENT_COMP,
  PLAYER_CONTROLLED_COMP,
  POSITION_COMP,
  SPAWNED_COMP,
  UI_COMP
} from './components/ComponentNamesConfig';
import {IAnimationMap} from '../interfaces/interfaces';
import HasActionSignComponent from './components/HasActionSignComponent';
import {AllowedQuestState} from './components/QuestDataComponent';
import CanSpawn from './components/CanSpawn';
import BackgroundComponent from './components/BackgroundComponent';
import PlayerControlledComponent from './components/PlayerControlledComponent';
import Dialog from './components/Dialog';
import AnimationComp, {IAnimationVariantArguments} from './components/AnimationComp';
import {bit, DIRECTIONS_OPTIONS} from './gameConstants';
import {ICoordinates} from 'game-platform/dist/lib/interfaces';
import MoveComponent from './components/MoveComponent';
import SpawnedComponent from './components/SpawnedComponent';
import IsMoving from './components/IsMoving';
import Health from './components/Health';
import PositionComponent from './components/PositionComponent';
import UIComponent from './components/UIComponent';
import CanAssignQuestsComponent from './components/CanAssignQuestsComponent';
import Quest from './entities/Quest';
import IsAttackingComp from './components/IsAttacking';
import AIVisionComponent from './components/AIVisionComponent';
import AttackComponent from './components/AttackComponent';

class BaseEntity extends Entity {
  id: number;
  name: string;
  [HEALTH_COMP]: Health; // Rename to HealthComp?
  [ANIMATION_COMP]: AnimationComp;
  [PLAYER_CONTROLLED_COMP]: PlayerControlledComponent;
  [MOVEMENT_COMP]: MoveComponent;
  [POSITION_COMP]: PositionComponent;
  [IS_MOVING_COMP]: IsMoving;
  [AI_VISION_COMP]: AIVisionComponent;
  [IS_ATTACKING_COMP]: IsAttackingComp;
  [ATTACK_COMP]: AttackComponent;
  [DIALOG_COMP]: Dialog;
  [BACKGROUND_COMP]: BackgroundComponent;
  [CAN_SPAWN_COMP]: CanSpawn;
  [UI_COMP]: UIComponent;
  [CAN_ASSIGN_QUESTS_COMP]: CanAssignQuestsComponent;
  [HAS_ACTION_SIGN_COMP]: HasActionSignComponent;
  [SPAWNED_COMP]: SpawnedComponent;

  constructor(entity: any) {
    super(entity);
  }

  addAnimation(animation: IAnimationVariantArguments) {
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

  calcOrientation(destX: number, destY: number): DIRECTIONS_OPTIONS {
    let {x, y} = this.getPos();

    if (destX > x) {
      return DIRECTIONS_OPTIONS.RIGHT;
    } else if (destX < x) {
      return DIRECTIONS_OPTIONS.LEFT;
    } else if (destY > y) {
      return DIRECTIONS_OPTIONS.DOWN;
    } else if (destY < y) {
      return DIRECTIONS_OPTIONS.UP;
    } else {
      return this.getOrientation(); // by default, get current one
    }
  }

  getAnimations(): IAnimationMap {
    return (this[ANIMATION_COMP] && this[ANIMATION_COMP].animations) || {};
  }

  getAnimationTypes() {
    return this[ANIMATION_COMP] && this[ANIMATION_COMP].animationTypes;
  }

  hasSpecificAnimation(name: string) {
    return !!this.getAnimations()[name];
  }

  getMovementSpeed() {
    return this[MOVEMENT_COMP] && this[MOVEMENT_COMP].speed;
  }

  removeAnimation(animationName: string) {
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

  setDest({x, y}: ICoordinates) {
    if (this[POSITION_COMP]) {
      this[POSITION_COMP].destX = x;
      this[POSITION_COMP].destY = y;
    }
  }

  setMoveDirection(dir: DIRECTIONS_OPTIONS) {
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

  setOrientation(direction: DIRECTIONS_OPTIONS) {
    this[POSITION_COMP].orientation = direction;
  }

  getOrientation() {
    return this[POSITION_COMP].orientation;
  }

  isMoving(): boolean {
    return !!this[IS_MOVING_COMP];
  }

  setPos({x, y}: ICoordinates) {
    this[POSITION_COMP].x = x;
    this[POSITION_COMP].y = y;
  }

  getQuestsByStatus(questState: AllowedQuestState) {
    return this.getQuests().filter((quest: Quest) => {
      return quest.getState() === questState;
    });
  }

  setQuestActionSymbol(newSymbol: '!' | '?') {
    if (!this.hasSpecificAnimation(HAS_ACTION_SIGN_COMP)) {
      this.addComponent(new HasActionSignComponent(newSymbol));
    } else {
      this[HAS_ACTION_SIGN_COMP].symbol = newSymbol;
    }
  }

  getQuests() {
    if (this[CAN_ASSIGN_QUESTS_COMP]) {
      return this[CAN_ASSIGN_QUESTS_COMP].quests;
    } else {
      return [];
    }
  }

  getPos() {
    if (this[POSITION_COMP]) {
      return {
        x: this[POSITION_COMP].x,
        y: this[POSITION_COMP].y
      };
    }
  }

  // TODO ensure this works QA
  getDestFromDirection(dir: DIRECTIONS_OPTIONS) {
    let {x, y} = this.getPos();

    if (dir === DIRECTIONS_OPTIONS.UP) {
      return {
        x,
        y: y - bit
      };
    }

    if (dir === DIRECTIONS_OPTIONS.DOWN) {
      return {
        x,
        y: y + bit
      };
    }

    if (dir === DIRECTIONS_OPTIONS.LEFT) {
      return {
        x: x - bit,
        y
      };
    }

    if (dir === DIRECTIONS_OPTIONS.RIGHT) {
      return {
        x: x + bit,
        y
      };
    }
  }

  setDestTo(dir: DIRECTIONS_OPTIONS) {
    let {x, y} = this.getPos();
    this[POSITION_COMP].originX = x;
    this[POSITION_COMP].originY = y;

    if (dir === DIRECTIONS_OPTIONS.UP) {
      this.setDest({
        x,
        y: y - bit
      });
    }

    if (dir === DIRECTIONS_OPTIONS.DOWN) {
      this.setDest({
        x,
        y: y + bit
      });
    }

    if (dir === DIRECTIONS_OPTIONS.LEFT) {
      this.setDest({
        x: x - bit,
        y
      });
    }

    if (dir === DIRECTIONS_OPTIONS.RIGHT) {
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

export {BaseEntity};
