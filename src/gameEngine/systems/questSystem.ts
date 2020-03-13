import GAME_PLATFORM from 'game-platform';
import {
  POSITION_COMP,
  PLAYER_CONTROLLED_COMP, CAN_ASSIGN_QUESTS_COMP, UI_COMP, HAS_ACTION_SIGN_COMP, QUEST_DATA_COMP
} from 'components/ComponentNamesConfig';

import BaseEntity from "BaseEntity";
import {ISystemArguments} from "../../interfaces/gameloop.i";
import {AllowedUIShapes, CANVAS_OUTPUT} from "gameConstants";
import HasActionSignComponent from "components/HasActionSignComponent";
import {AllowedQuestState} from "components/QuestDataComponent";

let {Entity, entityLoop} = GAME_PLATFORM;

function questSystem(systemArguments: ISystemArguments) {
  let entitiesThatGiveQuests = Entity.getByComps([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP]);
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

  // Quest as an Entity
  // - Kill quests have a KILL component
  // - Item quests have an Item Component

  // Get all quests in gameAll quests in game...
  // We can now search on all quests for the
  let quests = Entity.getByComps([QUEST_DATA_COMP]);
  /**
   * Get all quests with state HIDDEN and check if preconditions are met
   * IF preconditions are met, set state to AVAILABLE
   */

  /**
   * Put the HAS_ACTION_SIGN_COMP on any entity that has available quests to give
   */
  entityLoop(entitiesThatGiveQuests, (entityThatGivesQuest: BaseEntity) => {
    // if we have quests, add a question mark on the entity
    let quests = entityThatGivesQuest.getQuestsByStatus(AllowedQuestState.AVAILABLE);

    if (entityThatGivesQuest.getQuestsByStatus(AllowedQuestState.AVAILABLE).length) {
      // We have quests
      if (!entityThatGivesQuest.hasComponents(HAS_ACTION_SIGN_COMP)) {
        entityThatGivesQuest.addComponent(new HasActionSignComponent());
      }
    } else {
      entityThatGivesQuest.removeComponent(HAS_ACTION_SIGN_COMP);
    }
  });
}

export default questSystem;