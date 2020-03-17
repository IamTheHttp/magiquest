import {AllowedQuestIDs} from "gameConstants";
import {IKillQuestData, IQuestData} from "components/QuestDataComponent";

let questsDataConfig: {
  [key: string]: IQuestData | IKillQuestData
} = {
  [AllowedQuestIDs.CLEAR_CAMP]: {
    id: AllowedQuestIDs.CLEAR_CAMP,
    requiredLevel: 1,
    preCondition: '',
    reward: '',
    description: "Help us stranger!\nThe camp outside is filled with ugly monsters!\nKill them all, and I'll get you a reward",
    finishedText: "Thank you so much, here is your reward",
    kill: { // kill specifies a TYPE of quest..
      killed: 0,
      killGoal: 10,
      location: 'foo', // TODO what should this be?
    }
  } as IKillQuestData
};


export default questsDataConfig;