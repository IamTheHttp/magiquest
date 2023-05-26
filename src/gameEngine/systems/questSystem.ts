import {GameEvent, InteractWithNPC} from '../classes/GameEvents';
import {
  ASSIGNS_QUESTS,
  ACTION_SIGN,
  KILL_QUEST_DATA,
  PLAYER_CONTROLLED,
  POSITION,
  QUEST_DATA,
  UI
} from '../components/_ComponentNames';
import Quest, {KillQuest} from '../entities/Quest';
import {BaseEntity} from '../BaseEntity';
import {isNonEmptyArray} from './portalSystem';
import {DialogTrigger, pushTrigger} from './triggerSystem';
import {ISystemArguments} from '../../interfaces/IGameLoop';
import {Entity, entityLoop} from 'game-platform';

function questSystem(systemArguments: ISystemArguments) {
  const {gameEvents} = systemArguments;
  const entitiesThatGiveQuests = Entity.getByComps<BaseEntity>([ASSIGNS_QUESTS, POSITION, UI]);
  const player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

  // Quests are entities that inside a component
  const quests = Entity.getByComps<BaseEntity>([QUEST_DATA]) as Quest[];

  /**
   * System does a few things...
   * 1.
   * 2. Move the Quests state around based on conditions and checks,
   *    this is done on -- Entity.getByComp<BaseEntity>([QUEST_DATA_COMP])
   * 3. Assign UI elements to NPCs based on Quest state, this is done on --
   *    Entity.getByComp<BaseEntity>([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP])
   */

  const killQuests = Entity.getByComps<BaseEntity>([KILL_QUEST_DATA]) as KillQuest[];
  const eventsToProcess: GameEvent[] = gameEvents.getEvents();

  // 1. process events
  eventsToProcess.forEach((gameEvent: GameEvent) => {
    // killing enemies affects some quests
    // TODO This is commented out for reference for when we'll re-implement these features.
    // if (gameEvent instanceof EnemyKilledEvent) {
    //   let {entity} = gameEvent.readEvent();
    //
    //   killQuests.forEach((quest) => {
    //     if (entity.hasComponents(SPAWNED_COMP)) {
    //       let locationID = entity[SPAWNED_COMP].spawningTileLocationID;
    //
    //       if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
    //         if (locationID === quest[KILL_QUEST_DATA_COMP].data.kill.location) {
    //           quest[KILL_QUEST_DATA_COMP].data.kill.killed++;
    //
    //           if (quest.isPostReqComplete()) {
    //             quest.setState(AllowedQuestState.DONE);
    //           }
    //         }
    //       }
    //     }
    //   });
    // }

    if (gameEvent instanceof InteractWithNPC) {
      const NPCEntity = gameEvent.readEvent().entity;

      const availableQuests = NPCEntity.getQuestsByStatus('AVAILABLE');
      const doneQuests = NPCEntity.getQuestsByStatus('DONE') as Quest[];

      if (isNonEmptyArray(doneQuests)) {
        const quest = doneQuests[0];
        quest.setState('REWARDED');

        pushTrigger(
          new DialogTrigger({
            type: 'dialog',
            oneOff: true,
            lines: [
              {
                text: quest.getFinishedText()
              }
            ],
            actedOnEntity: NPCEntity
          })
        );
        return;
      }

      if (isNonEmptyArray(availableQuests)) {
        const quest = availableQuests[0];
        quest.setState('IN_PROGRESS');

        pushTrigger(
          new DialogTrigger({
            type: 'dialog',
            oneOff: true,
            lines: [
              {
                text: quest.getDescription()
              }
            ],
            actedOnEntity: NPCEntity
          })
        );
        return;
      }
    }
  });

  // 2. Adjust Quest state
  quests.forEach((quest) => {
    // Hidden should turn to Available, if quest see-conditions are met.
    if (quest.getState() === 'HIDDEN') {
      // if precondition is right
      if (true) {
        quest.setState('AVAILABLE');
      }
    }

    // In progress should be done, if quest fulfil-conditions are met
    if (quest.getState() === 'IN_PROGRESS') {
      // if precondition is right
      if (quest.isPostReqComplete()) {
        quest.setState('DONE');
      }
    }
  });

  // 3. Assign UI elements to NPCs based on Quest state
  entityLoop<BaseEntity>(entitiesThatGiveQuests, (entityThatGivesQuest) => {
    // Switch of the following:
    // if AVAILABLE, show yellow "?"
    // If done, show yellow "!"

    const doneQuests = entityThatGivesQuest.getQuestsByStatus('DONE');
    const availableQuests = entityThatGivesQuest.getQuestsByStatus('AVAILABLE');
    const hasActionSign = entityThatGivesQuest.hasComponents(ACTION_SIGN);

    if (isNonEmptyArray(availableQuests)) {
      entityThatGivesQuest.setQuestActionSymbol('?');
      return;
    }

    if (isNonEmptyArray(doneQuests)) {
      entityThatGivesQuest.setQuestActionSymbol('!');
      return;
    }

    // default,
    entityThatGivesQuest.removeComponent(ACTION_SIGN);
  });
}

export default questSystem;
