import {BaseEntity} from '../BaseEntity';
import questsDataConfig from '../../data/questsDataConfig';
import QuestData, {AllowedQuestState, KillQuestDataComponent} from '../components/QuestData';
import {KILL_QUEST_DATA, QUEST_DATA} from '../components/_ComponentNames';
import {AllowedQuestIDs} from '../gameConstants';

class Quest extends BaseEntity {
  [QUEST_DATA]: QuestData;
  constructor(questID: AllowedQuestIDs) {
    super();
    this.addComponent(new QuestData(questID, questsDataConfig[questID]));
  }

  getFinishedText() {
    return this[QUEST_DATA].data.finishedText;
  }
  getDescription() {
    return this[QUEST_DATA].data.description;
  }

  getState() {
    return this[QUEST_DATA].data.state;
  }

  setState(newState: AllowedQuestState) {
    this[QUEST_DATA].data.state = newState;
  }

  isPostReqComplete() {
    return true;
  }
}

export class KillQuest extends Quest {
  [KILL_QUEST_DATA]: KillQuestDataComponent;
  constructor(questID: AllowedQuestIDs) {
    super(questID);
    // This 'Any' is allowed, as technically all this DataConfig will be coming from a JSON in the future
    // That JSON will be 'any'
    this.addComponent(new KillQuestDataComponent(questID, questsDataConfig[questID] as any));
  }

  isPostReqComplete() {
    return this[KILL_QUEST_DATA].data.kill.killed >= this[KILL_QUEST_DATA].data.kill.killGoal;
  }
}

export default Quest;
