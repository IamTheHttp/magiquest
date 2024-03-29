import Player from '../entities/placeableEntities/Player';
import {BaseEntity} from '../BaseEntity';
import PlaceableEntity from '../entities/placeableEntities/PlaceableEntity';

export class GameEvent {
  protected readonly entity: PlaceableEntity;
  constructor(entity: PlaceableEntity) {
    this.entity = entity;
  }
  readEvent(): {entity: BaseEntity} {
    return {
      entity: null
    };
  }
}

// TODO To remove!
// export class EnemyKilledEvent extends GameEvent {
//   constructor(entity: PlaceableEntity) {
//     super(entity);
//   }
//   readEvent(): {entity: PlaceableEntity} {
//     return {
//       entity: this.entity
//     };
//   }
// }

export class InteractWithNPC extends GameEvent {
  constructor(entity: PlaceableEntity) {
    super(entity);
  }
  readEvent() {
    return {
      entity: this.entity
    };
  }
}

export class PlayerIsAttacked extends GameEvent {
  constructor(entity: Player) {
    super(entity);
  }
  readEvent() {
    return {
      entity: this.entity
    };
  }
}

export class PlayerSkillsChangeEvent extends GameEvent {
  constructor(entity: Player) {
    super(entity);
  }
  readEvent() {
    return {
      entity: this.entity
    };
  }
}

export class LevelUpEvent extends GameEvent {
  readEvent(): {entity: BaseEntity} {
    return {
      entity: null
    };
  }
}

export class QuestCompleteEvent extends GameEvent {
  readEvent(): {entity: BaseEntity} {
    return {
      entity: null
    };
  }
}

/**
 *     // Similar to trigger system:

 Example USage
 - User action needs to create a quest. (UserInput)
 - User meets a precondition, update quest state (Quest System)
    This is now an event, "PlayerLeveledUp", that the systems can consume
 - User kills an enemy, the quest is updated
 - User kills another enemy, The quest state is updated

 DeathProcess(previously) dealt with all death related stuff, BUT, this is actually a lot
 - All these and more should happen in death process
     Update quest
     Calculate Drop
     Calculate Exp
   These sound like separate systems, so KillEvent was created.


 attackSystem should dispatch the KillEvent.
 Events are in two lists - events for THIS_TICK and for NEXT_TICK
 Systems read from THIS_TICK list, but they write to NEXT_TICK list
 THIS_TICK list empties at the end of the loop. (in gameloop)
 Every system should extract the events it cares about, and only them - Is this a loop?
 */
class GameEvents {
  events: GameEvent[];
  nextEvents: GameEvent[];
  constructor() {
    this.events = [];
    this.nextEvents = [];
  }

  getEvents(): GameEvent[] {
    return this.events;
  }

  pushEvent(event: GameEvent) {
    this.nextEvents.push(event);
  }

  endTick() {
    this.events = this.nextEvents;
    this.nextEvents = [];
  }
}

export default GameEvents;
