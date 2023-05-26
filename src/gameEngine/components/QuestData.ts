import {KILL_QUEST_DATA, QUEST_DATA} from './_ComponentNames';
import {I_ALLOWED_QUEST_IDS} from '../gameConstants';

export type I_ALLOWED_QUEST_STATE =
  | 'HIDDEN' // Not shown by the NPC, can't be offered
  | 'AVAILABLE' // Shown by the NPC
  | 'IN_PROGRESS' // Quest is underway by the player
  | 'DONE' // Quest is done by the player, did not return for reward yet
  | 'REWARDED'; // quest is finished, rewarded and done for good.

export interface IQuestData {
  state?: I_ALLOWED_QUEST_STATE;
  id: I_ALLOWED_QUEST_IDS;
  requiredLevel: number;
  description: string;
  finishedText: string;
  preCondition: any; // TODO what is precondition?(needs to be defined)
  reward: any; // TODO what is reward?(needs to be defined)
}

export interface IKillQuestData extends IQuestData {
  kill: {
    killed: number;
    killGoal: number;
    location: any; // what should this be?
  };
}

class QuestData {
  name: string;
  data: IQuestData;

  constructor(questID: I_ALLOWED_QUEST_IDS, data: IQuestData) {
    this.name = QUEST_DATA; // component name
    const {id, requiredLevel, preCondition, reward, description, finishedText} = data;
    this.data = {
      state: 'AVAILABLE',
      description,
      id,
      requiredLevel,
      preCondition,
      reward,
      finishedText
    };
  }
}

export class KillQuestDataComponent extends QuestData {
  data: IKillQuestData;
  constructor(questID: I_ALLOWED_QUEST_IDS, data: IKillQuestData) {
    super(questID, data);
    const {killGoal, killed, location} = data.kill;
    this.data.kill = {
      killGoal,
      killed,
      location
    };
    this.name = KILL_QUEST_DATA;
  }
}

export default QuestData;
