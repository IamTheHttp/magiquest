import GAME_PLATFORM from 'game-platform';
import {
  CAN_ASSIGN_QUESTS_COMP,
  HAS_ACTION_SIGN_COMP, KILL_QUEST_DATA_COMP,
  PLAYER_CONTROLLED_COMP,
  POSITION_COMP,
  QUEST_DATA_COMP, SPAWNED_COMP,
  UI_COMP
} from 'components/ComponentNamesConfig';

import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../interfaces/gameloop.i";
import HasActionSignComponent from "components/HasActionSignComponent";
import {AllowedQuestState} from "components/QuestDataComponent";
import Quest, {KillQuest} from "entities/Quest";
import {isNonEmptyArray} from "systems/portalSystem";
import {EnemyKillEvent, IGameEvent} from "classes/GameEvents";

let {Entity, entityLoop} = GAME_PLATFORM;

function questSystem(systemArguments: ISystemArguments) {
  let {gameEvents} = systemArguments;
  let entitiesThatGiveQuests = Entity.getByComps([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP]);
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  // Quests are entities that inside a component
  let quests = Entity.getByComps([QUEST_DATA_COMP]) as Quest[];

  /**
   * System does a few things...
   * 1.
   * 2. Move the Quests state around based on conditions and checks, this is done on -- Entity.getByComps([QUEST_DATA_COMP])
   * 3. Assign UI elements to NPCs based on Quest state, this is done on -- Entity.getByComps([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP])
   */

  let killQuests = Entity.getByComps([KILL_QUEST_DATA_COMP]) as KillQuest[];
  let eventsToProcess:IGameEvent[] = gameEvents.getEvents();

  // 1. process events related to Killing enemies
  eventsToProcess.forEach((gameEvent:IGameEvent) => {
    if (gameEvent instanceof EnemyKillEvent) {
      let {entity} = gameEvent.readEvent();

      killQuests.forEach((quest) => {
        let locationID = entity[SPAWNED_COMP].spawningTileLocationID;

        if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
          if (locationID === quest[KILL_QUEST_DATA_COMP].data.kill.location) {
            quest[KILL_QUEST_DATA_COMP].data.kill.killed++;

            if (quest.isPostReqComplete()) {
              quest.setState(AllowedQuestState.DONE);
            }
          }
        }
      });
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
  entityLoop(entitiesThatGiveQuests, (entityThatGivesQuest: BaseEntity) => {
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