import BaseEntity from '../BaseEntity';
import {AllowedQuestIDs} from "gameConstants";
import QuestDataComponent, {AllowedQuestState} from "components/QuestDataComponent";
import {QUEST_DATA_COMP} from "components/ComponentNamesConfig";

class Quest extends BaseEntity {
  [QUEST_DATA_COMP]: QuestDataComponent;
  constructor(questID: AllowedQuestIDs) {
    super(Quest);
    this.addComponent(new QuestDataComponent(questID));
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

export default Quest;
