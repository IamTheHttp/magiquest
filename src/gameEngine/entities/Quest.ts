import BaseEntity from '../BaseEntity';
import {AllowedQuestIDs} from "gameConstants";
import QuestDataComponent, {AllowedQuestState, KillQuestDataComponent} from "components/QuestDataComponent";
import {QUEST_DATA_COMP} from "components/ComponentNamesConfig";
import questsDataConfig from "../../levels/questsDataConfig";

class Quest extends BaseEntity {
  [QUEST_DATA_COMP]: QuestDataComponent;
  constructor(questID: AllowedQuestIDs) {
    super(Quest);
    this.addComponent(new QuestDataComponent(questID, questsDataConfig[questID]));
  }

  getFinishedText() {
    return this[QUEST_DATA_COMP].data.finishedText;
  }
  getDescription() {
    return this[QUEST_DATA_COMP].data.description;
  }

  getState() {
    return this[QUEST_DATA_COMP].data.state;
  }

  setState(newState: AllowedQuestState) {
    this[QUEST_DATA_COMP].data.state = newState;
  }
}


class KillQuest extends Quest {
  [QUEST_DATA_COMP]: KillQuestDataComponent;
  constructor(questID: AllowedQuestIDs) {
    super(questID);
    // This 'Any' is allowed, as technically all this DataConfig will be coming from a JSON in the future
    // That JSON will be 'any'
    this.addComponent(new KillQuestDataComponent(questID, questsDataConfig[questID] as any));
  }

  addKill() {

  }
}

export default Quest;
