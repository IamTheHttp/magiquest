import {BaseEntity} from '../BaseEntity';
import questsDataConfig from '../../data/questsDataConfig';
import QuestDataComponent, {AllowedQuestState, KillQuestDataComponent} from '../components/QuestDataComponent';
import {KILL_QUEST_DATA_COMP, QUEST_DATA_COMP} from '../components/ComponentNamesConfig';
import {AllowedQuestIDs} from '../gameConstants';

class Quest extends BaseEntity {
  [QUEST_DATA_COMP]: QuestDataComponent;
  constructor(questID: AllowedQuestIDs) {
    super();
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

  isPostReqComplete() {
    return true;
  }
}

export class KillQuest extends Quest {
  [KILL_QUEST_DATA_COMP]: KillQuestDataComponent;
  constructor(questID: AllowedQuestIDs) {
    super(questID);
    // This 'Any' is allowed, as technically all this DataConfig will be coming from a JSON in the future
    // That JSON will be 'any'
    this.addComponent(new KillQuestDataComponent(questID, questsDataConfig[questID] as any));
  }

  isPostReqComplete() {
    return this[KILL_QUEST_DATA_COMP].data.kill.killed >= this[KILL_QUEST_DATA_COMP].data.kill.killGoal;
  }
}

export default Quest;
