import {IKillQuestData, IQuestData} from '../../gameEngine/components/QuestData';

const questsDataConfig: {[key: string]: IQuestData | IKillQuestData} = {
  ['CLEAR_CAMP']: {
    id: 'CLEAR_CAMP',
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
      location: 'SPAWNABLE_1'
    }
  } as IKillQuestData
};

export default questsDataConfig;
