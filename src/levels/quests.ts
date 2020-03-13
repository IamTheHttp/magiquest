import Quest from "classes/Quest";
import {AllowedQuestIDs} from "gameConstants";

let quests: { [key: string]: Quest } = {
  [AllowedQuestIDs.CLEAR_CAMP]: {
    id: AllowedQuestIDs.CLEAR_CAMP,
    requiredLevel: 1,
    preCondition: '',
    reward: ''
  }
};


export default quests;