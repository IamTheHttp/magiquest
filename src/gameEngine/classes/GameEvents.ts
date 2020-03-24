import BaseEntity from "BaseEntity";
import Enemy from "entities/characters/Enemies/Enemy";

export interface IGameEvent {
  readEvent():any; // TODO is it any really?
}

class GameEvent implements IGameEvent {
  readEvent() {
    // TODO needs to be implemented
  }
}

export class EnemyKillEvent extends GameEvent {
  constructor(public entity:Enemy) {
    super();
    // I care about...
    // Entity that was killed.
  }
  readEvent(): {entity: Enemy} {
    return {
      entity: this.entity
    }
  }
}

export class InteractWithNPC extends GameEvent {
  constructor(public entity:BaseEntity) {
    super();
  }
  readEvent() {
    return {
      entity:this.entity
    }
  }
}

export class LevelUpEvent extends GameEvent {
  // I care about, Entity of the player, maybe not even that...
  readEvent() {
    return {
      // TODO to be implemented
    }
  }
}

export class QuestCompleteEvent extends GameEvent {
  // I care about.. Nothing probably, maybe the quest ID that was completed
  readEvent() {
    // TODO to be implemented
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

  getEvents():GameEvent[] {
    return this.events;
  }

  pushEvent(event:GameEvent) {
    console.log('Pushed event', event);
    this.nextEvents.push(event);
  }

  endTick() {
    this.events = this.nextEvents;
    this.nextEvents = [];
  }
}


export default GameEvents;