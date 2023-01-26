import {Entity} from 'game-platform';
import {
  HAS_AI_VISION,
  HAS_ANIMATIONS,
  CAN_ATTACK,
  HAS_BACKGROUND_UI,
  CAN_ASSIGN_QUESTS,
  CAN_SPAWN,
  DIALOG_COMP,
  HAS_ACTION_SIGN_COMP,
  HAS_HEALTH,
  IS_ATTACKING_COMP,
  IS_MOVING_COMP,
  MOVEMENT_COMP,
  PLAYER_CONTROLLED_COMP,
  HAS_POSITION,
  SPAWNED_COMP,
  HAS_UI
} from './components/_ComponentNamesConfig';
import HasActionSignComponent from './components/HasActionSignComponent';
import {AllowedQuestState} from './components/QuestDataComponent';
import CanSpawn from './components/CanSpawn';
import HasBackgroundUI from './components/HasBackgroundUI';
import PlayerControlledComponent from './components/PlayerControlledComponent';
import Dialog from './components/Dialog';
import {HasAnimations, IRunningAnimationMap, IAnimationDefinition} from './components/HasAnimations';
import {TILE_SIZE, DIRECTIONS} from './gameConstants';
import {ICoordinates} from 'game-platform/dist/lib/interfaces';
import MoveComponent from './components/MoveComponent';
import SpawnedComponent from './components/SpawnedComponent';
import IsMoving from './components/IsMoving';
import HasHealth from './components/HasHealth';
import HasPosition from './components/HasPosition';
import HasUI from './components/HasUI';
import CanAssignQuests from './components/CanAssignQuests';
import Quest from './entities/Quest';
import IsAttackingComp from './components/IsAttacking';
import HasAIVision from './components/HasAIVision';
import CanAttack from './components/CanAttack';
import Player from './entities/placeableEntities/Player';

class BaseEntity extends Entity {
  id: number;
  name: string;
  [HAS_HEALTH]: HasHealth; // Rename to HealthComp?
  [HAS_ANIMATIONS]: HasAnimations;
  [PLAYER_CONTROLLED_COMP]: PlayerControlledComponent;
  [MOVEMENT_COMP]: MoveComponent;
  [HAS_POSITION]: HasPosition;
  [IS_MOVING_COMP]: IsMoving;
  [HAS_AI_VISION]: HasAIVision;
  [IS_ATTACKING_COMP]: IsAttackingComp;
  [CAN_ATTACK]: CanAttack;
  [DIALOG_COMP]: Dialog;
  [HAS_BACKGROUND_UI]: HasBackgroundUI;
  [CAN_SPAWN]: CanSpawn;
  [HAS_UI]: HasUI;
  [CAN_ASSIGN_QUESTS]: CanAssignQuests;
  [HAS_ACTION_SIGN_COMP]: HasActionSignComponent;
  [SPAWNED_COMP]: SpawnedComponent;

  addAnimationToRun(animation: IAnimationDefinition) {
    this[HAS_ANIMATIONS].addAnimationToRun(animation);
  }

  isPlayer(): this is Player {
    return !!this[PLAYER_CONTROLLED_COMP];
  }

  removeAllRunningAnimations() {
    if (!this[HAS_ANIMATIONS]) {
      return;
    }

    this[HAS_ANIMATIONS].runningAnimations = {};
  }

  calcOrientation(destX: number, destY: number): keyof typeof DIRECTIONS {
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

  /**
   * Get the running animations of the entity, those that are in progress
   */
  getRunningAnimations(): IRunningAnimationMap {
    return (this[HAS_ANIMATIONS] && this[HAS_ANIMATIONS].runningAnimations) || {};
  }

  /**
   * Get the possible animations this entity can have
   */
  getPossibleAnimations() {
    return this[HAS_ANIMATIONS] && this[HAS_ANIMATIONS].possibleAnimationsForEntity;
  }

  isSpecificAnimationRunning(name: string) {
    return !!this.getRunningAnimations()[name];
  }

  getMovementSpeed() {
    return this[MOVEMENT_COMP] && this[MOVEMENT_COMP].speed;
  }

  removeRunningAnimation(animationName: string) {
    if (!this[HAS_ANIMATIONS]) {
      return;
    }
    delete this[HAS_ANIMATIONS].runningAnimations[animationName];
  }

  getAIVisionRange() {
    return this[HAS_AI_VISION] && this[HAS_AI_VISION].range;
  }

  isAttacking() {
    return !!this[IS_ATTACKING_COMP];
  }

  isAttackable() {
    return !!this[HAS_HEALTH];
  }

  setDest({x, y}: ICoordinates) {
    if (this[HAS_POSITION]) {
      this[HAS_POSITION].destX = x;
      this[HAS_POSITION].destY = y;
    }
  }

  setMoveDirection(dir: keyof typeof DIRECTIONS) {
    if (!this[IS_MOVING_COMP]) {
      this.addComponent(new IsMoving());
    }

    this[IS_MOVING_COMP].direction = dir;
  }

  getDest() {
    return {
      x: this[HAS_POSITION].destX,
      y: this[HAS_POSITION].destY
    };
  }

  stop() {
    this[HAS_POSITION].originX = null;
    this[HAS_POSITION].originY = null;
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

  setOrientation(direction: keyof typeof DIRECTIONS) {
    this[HAS_POSITION].orientation = direction;
  }

  getOrientation() {
    return this[HAS_POSITION].orientation;
  }

  isMoving(): boolean {
    return !!this[IS_MOVING_COMP];
  }

  setPos({x, y}: ICoordinates) {
    this[HAS_POSITION].x = x;
    this[HAS_POSITION].y = y;
  }

  getQuestsByStatus(questState: AllowedQuestState) {
    return this.getQuests().filter((quest: Quest) => {
      return quest.getState() === questState;
    });
  }

  setQuestActionSymbol(newSymbol: '!' | '?') {
    if (!this.isSpecificAnimationRunning(HAS_ACTION_SIGN_COMP)) {
      this.addComponent(new HasActionSignComponent(newSymbol));
    } else {
      this[HAS_ACTION_SIGN_COMP].symbol = newSymbol;
    }
  }

  getQuests() {
    if (this[CAN_ASSIGN_QUESTS]) {
      return this[CAN_ASSIGN_QUESTS].quests;
    } else {
      return [];
    }
  }

  getPos() {
    if (this[HAS_POSITION]) {
      return {
        x: this[HAS_POSITION].x,
        y: this[HAS_POSITION].y
      };
    }
  }

  // TODO ensure this works QA
  getDestFromDirection(dir: keyof typeof DIRECTIONS) {
    let {x, y} = this.getPos();

    if (dir === DIRECTIONS.UP) {
      return {
        x,
        y: y - TILE_SIZE
      };
    }

    if (dir === DIRECTIONS.DOWN) {
      return {
        x,
        y: y + TILE_SIZE
      };
    }

    if (dir === DIRECTIONS.LEFT) {
      return {
        x: x - TILE_SIZE,
        y
      };
    }

    if (dir === DIRECTIONS.RIGHT) {
      return {
        x: x + TILE_SIZE,
        y
      };
    }
  }

  setDestTo(dir: keyof typeof DIRECTIONS) {
    let {x, y} = this.getPos();
    this[HAS_POSITION].originX = x;
    this[HAS_POSITION].originY = y;

    if (dir === DIRECTIONS.UP) {
      this.setDest({
        x,
        y: y - TILE_SIZE
      });
    }

    if (dir === DIRECTIONS.DOWN) {
      this.setDest({
        x,
        y: y + TILE_SIZE
      });
    }

    if (dir === DIRECTIONS.LEFT) {
      this.setDest({
        x: x - TILE_SIZE,
        y
      });
    }

    if (dir === DIRECTIONS.RIGHT) {
      this.setDest({
        x: x + TILE_SIZE,
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
