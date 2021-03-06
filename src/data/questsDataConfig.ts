import {AllowedZoneLocationIDs, AllowedQuestIDs} from '../gameEngine/gameConstants';
import {IKillQuestData, IQuestData} from '../gameEngine/components/QuestDataComponent';

let questsDataConfig: {
  [key: string]: IQuestData | IKillQuestData;
} = {
  [AllowedQuestIDs.CLEAR_CAMP]: {
    id: AllowedQuestIDs.CLEAR_CAMP,
    requiredLevel: 1,
    preCondition: '',
    reward: '',
    description:
      "Help us stranger!\nThe camp outside is filled with ugly monsters!\nKill them all, and I'll get you a reward",
    finishedText: 'Thank you so much, here is your reward',
    kill: {
      // kill specifies a TYPE of quest..
      killed: 0,
      killGoal: 2,
      location: AllowedZoneLocationIDs.SPAWNABLE_1
    }
  } as IKillQuestData
};

export default questsDataConfig;
