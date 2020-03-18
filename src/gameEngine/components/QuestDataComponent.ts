import {AllowedQuestIDs} from "gameConstants";
import questsDataConfig from "../../levels/questsDataConfig";
import {QUEST_DATA_COMP, KILL_QUEST_DATA_COMP} from "components/ComponentNamesConfig";

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
  description: string;
  finishedText: string;
  preCondition: any; // TODO what is precondition?
  reward: any; // TODO what is reward?
}

export interface IKillQuestData extends IQuestData {
  kill: {
    killed: number,
    killGoal: number;
    location: any; // what should this be?
  }
}


class QuestDataComponent {
  name: string;
  data: IQuestData;

  constructor(questID: AllowedQuestIDs, data: IQuestData) {
    this.name = QUEST_DATA_COMP; // component name
    let {id, requiredLevel, preCondition, reward, description, finishedText} = data;
    this.data = {
      state: AllowedQuestState.AVAILABLE,
      description,
      id,
      requiredLevel,
      preCondition,
      reward,
      finishedText
    };
  }
}

export class KillQuestDataComponent extends QuestDataComponent{
  data: IKillQuestData;
  constructor(questID: AllowedQuestIDs, data: IKillQuestData) {
    super(questID, data);
    let {killGoal, killed, location} = data.kill;
    this.data.kill = {
      killGoal, killed, location
    };
    this.name = KILL_QUEST_DATA_COMP;
  }
}


export default QuestDataComponent;