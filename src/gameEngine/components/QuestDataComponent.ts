import {AllowedQuestIDs} from "gameConstants";
import questsDataConfig from "../../levels/questsDataConfig";
import {QUEST_DATA_COMP} from "components/ComponentNamesConfig";

export enum AllowedQuestState {
  HIDDEN = 'HIDDEN', // Not shown by the NPC, can't be offered
  AVAILABLE = 'AVAILABLE', // Shown by the NPC
  IN_PROGRESS = 'IN_PROGRESS', // Quest is underway by the player
  DONE = 'DONE', // Quest is done by the player, did not return for reward yet
  REWARDED = 'REWARDED' // quest is finished, rewarded and done for good.
}

export interface IQuestData {
  state?: AllowedQuestState;
  id: AllowedQuestIDs;
  requiredLevel: number;
  description?: string;
  preCondition: any; // TODO what is precondition?
  reward: any; // TODO what is reward?
}

class QuestDataComponent {
  name:string;
  data: IQuestData;
  constructor(questID: AllowedQuestIDs) {
    this.name = QUEST_DATA_COMP; // component name
    let {id, requiredLevel, preCondition, reward} = questsDataConfig[questID];
    this.data = {
      state : AllowedQuestState.AVAILABLE,
      id,
      requiredLevel,
      preCondition,
      reward
    };
  }
}

export default QuestDataComponent;