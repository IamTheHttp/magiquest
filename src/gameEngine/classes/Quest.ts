// Pull quest data from json?

import {AllowedQuestIDs} from "gameConstants";
import quests from "../../levels/quests";

// In progress, available, notAvailable, Done

// we might need different classes of quests..
// KILL quest
// FETCH quest
// GAIN_EXP

class Quest {
  state?: 'NOT_AVAILABLE' | 'AVAILABLE' | 'IN_PROGRESS' | 'DONE';
  id: AllowedQuestIDs;
  requiredLevel: number;
  preCondition: any; // TODO what is precondition?
  reward: any; // TODO what is reward?

  constructor(id: AllowedQuestIDs, requiredLevel: number, preCondition: any, reward: any) {
    // initially, all quests are not available
    // TODO - later, the questSystem will update the state based on the player information
    this.state = 'NOT_AVAILABLE';
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