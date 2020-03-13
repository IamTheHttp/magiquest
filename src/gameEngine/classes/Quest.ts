import {AllowedQuestIDs} from "gameConstants";
import quests from "../../levels/quests";

export enum AllowedQuestState {
  HIDDEN = 'HIDDEN', // Not shown by the NPC, can't be offered
  AVAILABLE = 'AVAILABLE', // Shown by the NPC
  IN_PROGRESS = 'IN_PROGRESS', // Quest is underway by the player
  DONE = 'DONE', // Quest is done by the player, did not return for reward yet
  REWARDED = 'REWARDED' // quest is finished, rewarded and done for good.
}

class Quest {
  state?: AllowedQuestState;
  id: AllowedQuestIDs;
  requiredLevel: number;
  preCondition: any; // TODO what is precondition?
  reward: any; // TODO what is reward?

  constructor(id: AllowedQuestIDs, requiredLevel: number, preCondition: any, reward: any) {
    // initially, all quests are not available
    // TODO - later, the questSystem will update the state based on the player information
    this.state = AllowedQuestState.AVAILABLE;
    this.id = id;
    this.requiredLevel = requiredLevel;
    this.preCondition = preCondition;
    this.reward = reward;
  }

  static initialize(questID: AllowedQuestIDs) {
    let {id, requiredLevel, preCondition, reward} = quests[questID];

    return new Quest(id, requiredLevel, preCondition, reward);
  }
}

export default Quest