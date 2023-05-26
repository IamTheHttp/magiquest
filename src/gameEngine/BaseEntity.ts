import {Entity} from 'game-platform';
import {
  AI_VISION,
  ANIMATIONS,
  ATTACKER,
  BACKGROUND,
  ASSIGNS_QUESTS,
  SPAWNER,
  DIALOG,
  ACTION_SIGN,
  HEALTH,
  ATTACKING,
  MOVING,
  MOVEMENT,
  PLAYER_CONTROLLED,
  POSITION,
  WAS_SPAWNED,
  UI
} from './components/_ComponentNames';
import ActionSign from './components/ActionSign';
import {I_ALLOWED_QUEST_STATE} from './components/QuestData';
import Spawner from './components/Spawner';
import Background from './components/Background';
import PlayerControlled from './components/PlayerControlled';
import Dialog from './components/Dialog';
import {Animations, IRunningAnimationMap, IAnimationDefinition} from './components/Animations';
import {TILE_SIZE, I_DIRECTIONS} from './gameConstants';
import {ICoordinates} from 'game-platform/dist/lib/interfaces';
import Movement from './components/Movement';
import WasSpawned from './components/WasSpawned';
import Moving from './components/Moving';
import Health from './components/Health';
import Position from './components/Position';
import HasUI from './components/HasUI';
import AssignsQuests from './components/AssignsQuests';
import Quest from './entities/Quest';
import IsAttackingComp from './components/Attacking';
import AIVision from './components/AIVision';
import Attacker from './components/Attacker';
import Player from './entities/placeableEntities/Player';

class BaseEntity extends Entity {
  id: number;
  name: string;
  [HEALTH]: Health; // Rename to HealthComp?
  [ANIMATIONS]: Animations;
  [PLAYER_CONTROLLED]: PlayerControlled;
  [MOVEMENT]: Movement;
  [POSITION]: Position;
  [MOVING]: Moving;
  [AI_VISION]: AIVision;
  [ATTACKING]: IsAttackingComp;
  [ATTACKER]: Attacker;
  [DIALOG]: Dialog;
  [BACKGROUND]: Background;
  [SPAWNER]: Spawner;
  [UI]: HasUI;
  [ASSIGNS_QUESTS]: AssignsQuests;
  [ACTION_SIGN]: ActionSign;
  [WAS_SPAWNED]: WasSpawned;

  addAnimationToRun(animation: IAnimationDefinition) {
    this[ANIMATIONS].addAnimationToRun(animation);
  }

  isPlayer(): this is Player {
    return !!this[PLAYER_CONTROLLED];
  }

  removeAllRunningAnimations() {
    if (!this[ANIMATIONS]) {
      return;
    }

    this[ANIMATIONS].runningAnimations = {};
  }

  calcOrientation(destX: number, destY: number): I_DIRECTIONS {
    const {x, y} = this.getPos();

    if (destX > x) {
      return 'RIGHT';
    } else if (destX < x) {
      return 'LEFT';
    } else if (destY > y) {
      return 'DOWN';
    } else if (destY < y) {
      return 'UP';
    } else {
      return this.getOrientation(); // by default, get current one
    }
  }

  /**
   * Get the running animations of the entity, those that are in progress
   */
  getRunningAnimations(): IRunningAnimationMap {
    return (this[ANIMATIONS] && this[ANIMATIONS].runningAnimations) || {};
  }

  /**
   * Get the possible animations this entity can have
   */
  getPossibleAnimations() {
    return this[ANIMATIONS] && this[ANIMATIONS].possibleAnimationsForEntity;
  }

  isSpecificAnimationRunning(name: string) {
    return !!this.getRunningAnimations()[name];
  }

  getMovementSpeed() {
    return this[MOVEMENT] && this[MOVEMENT].speed;
  }

  removeRunningAnimation(animationName: string) {
    if (!this[ANIMATIONS]) {
      return;
    }
    delete this[ANIMATIONS].runningAnimations[animationName];
  }

  getAIVisionRange() {
    return this[AI_VISION] && this[AI_VISION].range;
  }

  isAttacking() {
    return !!this[ATTACKING];
  }

  isAttackable() {
    return !!this[HEALTH];
  }

  setDest({x, y}: ICoordinates) {
    if (this[POSITION]) {
      this[POSITION].destX = x;
      this[POSITION].destY = y;
    }
  }

  setMoveDirection(dir: I_DIRECTIONS) {
    if (!this[MOVING]) {
      this.addComponent(new Moving());
    }

    this[MOVING].direction = dir;
  }

  getDest() {
    return {
      x: this[POSITION].destX,
      y: this[POSITION].destY
    };
  }

  stop() {
    this[POSITION].originX = null;
    this[POSITION].originY = null;
    this.removeComponent(MOVING);
    this.setDest({
      x: null,
      y: null
    });
  }

  removeDirection() {
    if (this[MOVING]) {
      this[MOVING].direction = null;
    }
  }

  getMoveDirection() {
    return this[MOVING] && this[MOVING].direction;
  }

  setOrientation(direction: I_DIRECTIONS) {
    this[POSITION].orientation = direction;
  }

  getOrientation() {
    return this[POSITION].orientation;
  }

  isMoving(): boolean {
    return !!this[MOVING];
  }

  setPos({x, y}: ICoordinates) {
    this[POSITION].x = x;
    this[POSITION].y = y;
  }

  getQuestsByStatus(questState: I_ALLOWED_QUEST_STATE) {
    return this.getQuests().filter((quest: Quest) => {
      return quest.getState() === questState;
    });
  }

  setQuestActionSymbol(newSymbol: '!' | '?') {
    if (!this.isSpecificAnimationRunning(ACTION_SIGN)) {
      this.addComponent(new ActionSign(newSymbol));
    } else {
      this[ACTION_SIGN].symbol = newSymbol;
    }
  }

  getQuests() {
    if (this[ASSIGNS_QUESTS]) {
      return this[ASSIGNS_QUESTS].quests;
    } else {
      return [];
    }
  }

  getPos() {
    if (this[POSITION]) {
      return {
        x: this[POSITION].x,
        y: this[POSITION].y
      };
    }
  }

  // TODO ensure this works QA
  getDestFromDirection(dir: I_DIRECTIONS) {
    const {x, y} = this.getPos();

    if (dir === 'UP') {
      return {
        x,
        y: y - TILE_SIZE
      };
    }

    if (dir === 'DOWN') {
      return {
        x,
        y: y + TILE_SIZE
      };
    }

    if (dir === 'LEFT') {
      return {
        x: x - TILE_SIZE,
        y
      };
    }

    if (dir === 'RIGHT') {
      return {
        x: x + TILE_SIZE,
        y
      };
    }
  }

  setDestTo(dir: I_DIRECTIONS) {
    const {x, y} = this.getPos();
    this[POSITION].originX = x;
    this[POSITION].originY = y;

    if (dir === 'UP') {
      this.setDest({
        x,
        y: y - TILE_SIZE
      });
    }

    if (dir === 'DOWN') {
      this.setDest({
        x,
        y: y + TILE_SIZE
      });
    }

    if (dir === 'LEFT') {
      this.setDest({
        x: x - TILE_SIZE,
        y
      });
    }

    if (dir === 'RIGHT') {
      this.setDest({
        x: x + TILE_SIZE,
        y
      });
    }
  }

  isDestReached() {
    const xReached = this.getPos().x === this.getDest().x;
    const yReached = this.getPos().y === this.getDest().y;
    return xReached && yReached;
  }
}

export {BaseEntity};
