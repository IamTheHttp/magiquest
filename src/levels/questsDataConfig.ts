import {AllowedQuestIDs} from "gameConstants";
import {IQuestData} from "components/QuestDataComponent";

let questsDataConfig: { [key: string]: IQuestData } = {
  [AllowedQuestIDs.CLEAR_CAMP]: {
    id: AllowedQuestIDs.CLEAR_CAMP,
    requiredLevel: 1,
    preCondition: '',
    reward: ''
  }
};


export default questsDataConfig;