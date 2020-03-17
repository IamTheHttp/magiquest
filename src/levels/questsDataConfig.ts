import {AllowedQuestIDs} from "gameConstants";
import {IQuestData} from "components/QuestDataComponent";

let questsDataConfig: { [key: string]: IQuestData } = {
  [AllowedQuestIDs.CLEAR_CAMP]: {
    id: AllowedQuestIDs.CLEAR_CAMP,
    requiredLevel: 1,
    preCondition: '',
    reward: '',
    description: "Help us stranger!\nThe camp outside is filled with ugly monsters!\nKill them all, and I'll get you a reward",
    finishedText: "Thank you so much, here is your reward"
  }
};


export default questsDataConfig;