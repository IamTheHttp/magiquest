import {EnemyKilledEvent, IGameEvent, InteractWithNPC} from "../classes/GameEvents";
import {
  CAN_ASSIGN_QUESTS_COMP,
  HAS_ACTION_SIGN_COMP,
  KILL_QUEST_DATA_COMP, PLAYER_CONTROLLED_COMP,
  POSITION_COMP, QUEST_DATA_COMP,
  SPAWNED_COMP,
  UI_COMP
} from "../components/ComponentNamesConfig";
import Quest, {KillQuest} from "../entities/Quest";
import {BaseEntity} from "../BaseEntity";
import {AllowedQuestState} from "../components/QuestDataComponent";
import {isNonEmptyArray} from "./portalSystem";
import {pushTrigger, Trigger} from "./triggerSystem";
import {ISystemArguments} from "../../interfaces/gameloop.i";
import {Entity, entityLoop} from "game-platform";



function questSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
  let entitiesThatGiveQuests = Entity.getByComps<BaseEntity>([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP]);
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];

  // Quests are entities that inside a component
  let quests = Entity.getByComps<BaseEntity>([QUEST_DATA_COMP]) as Quest[];

  /**
   * System does a few things...
   * 1.
   * 2. Move the Quests state around based on conditions and checks, this is done on -- Entity.getByComp<BaseEntity>([QUEST_DATA_COMP])
   * 3. Assign UI elements to NPCs based on Quest state, this is done on -- Entity.getByComp<BaseEntity>([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP])
   */

  let killQuests = Entity.getByComps<BaseEntity>([KILL_QUEST_DATA_COMP]) as KillQuest[];
  let eventsToProcess:IGameEvent[] = gameEvents.getEvents();

  // 1. process events
  eventsToProcess.forEach((gameEvent:IGameEvent) => {
    // killing enemies affects some quests
    if (gameEvent instanceof EnemyKilledEvent) {
      let {entity} = gameEvent.readEvent();

      killQuests.forEach((quest) => {
        if (entity.hasComponents(SPAWNED_COMP)) {
          let locationID = entity[SPAWNED_COMP].spawningTileLocationID;

          if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
            if (locationID === quest[KILL_QUEST_DATA_COMP].data.kill.location) {
              quest[KILL_QUEST_DATA_COMP].data.kill.killed++;

              if (quest.isPostReqComplete()) {
                quest.setState(AllowedQuestState.DONE);
              }
            }
          }
        }
      });
    }

    if (gameEvent instanceof InteractWithNPC) {
      let NPCEntity = gameEvent.readEvent().entity;

      let availableQuests = NPCEntity.getQuestsByStatus(AllowedQuestState.AVAILABLE) as Quest[];
      let doneQuests = NPCEntity.getQuestsByStatus(AllowedQuestState.DONE) as Quest[];

      if (isNonEmptyArray(doneQuests)) {
        let quest = doneQuests[0];
        quest.setState(AllowedQuestState.REWARDED);

        pushTrigger(new Trigger({
          type: 'dialog',
          lines: [{
            text: quest.getFinishedText(),
            speaker: 1
          }],
          actedOnEntity: NPCEntity
        }));
        return;
      }

      if (isNonEmptyArray(availableQuests)) {
        let quest = availableQuests[0];
        quest.setState(AllowedQuestState.IN_PROGRESS);

        pushTrigger(new Trigger({
          type: 'dialog',
          lines: [{
            text: quest.getDescription(),
            speaker: 1
          }],
          actedOnEntity: NPCEntity
        }));
        return;
      }
    }
  });


  // 2. Adjust Quest state
  quests.forEach((quest) => {
    // Hidden should turn to Available, if quest see-conditions are met.
    if (quest.getState() === AllowedQuestState.HIDDEN) {
      // if precondition is right
      if (true) {
        quest.setState(AllowedQuestState.AVAILABLE);
      }
    }

    // In progress should be done, if quest fulfil-conditions are met
    if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
      // if precondition is right
      if (quest.isPostReqComplete()) {
        quest.setState(AllowedQuestState.DONE);
      }
    }
  });

  // 3. Assign UI elements to NPCs based on Quest state
  entityLoop<BaseEntity>(entitiesThatGiveQuests, (entityThatGivesQuest) => {
    // Switch of the following:
    // if AVAILABLE, show yellow "?"
    // If done, show yellow "!"

    let doneQuests = entityThatGivesQuest.getQuestsByStatus(AllowedQuestState.DONE);
    let availableQuests = entityThatGivesQuest.getQuestsByStatus(AllowedQuestState.AVAILABLE);
    let hasActionSign = entityThatGivesQuest.hasComponents(HAS_ACTION_SIGN_COMP);

    if (isNonEmptyArray(availableQuests)) {
      entityThatGivesQuest.setQuestActionSymbol('?');
      return;
    }

    if (isNonEmptyArray(doneQuests)) {
      entityThatGivesQuest.setQuestActionSymbol('!');
      return;
    }

    // default,
    entityThatGivesQuest.removeComponent(HAS_ACTION_SIGN_COMP);
  });
}

export default questSystem;