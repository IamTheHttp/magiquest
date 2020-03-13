// Quests..

// Since quests are given by NPCs, this information has to be added there, probably under a key 'quests'
// Quests should have pre-conditions, to prevent them from being shown

// Quests have state - , In progress, available, notAvailable, Done

/**
 * ---    MVP    ---
 * -----------------
 *
 * [ ] Add quests to FamNPC (So they can give quests)
 * [ ] See question mark over character that has a quest.
 * [ ] Allow user to activate a quest, the NPC should not be able to give it again
 * [ ] Quests are game-long and not broken down into chapters
 */


import {CAN_ASSIGN_QUESTS_COMP} from './ComponentNamesConfig';
import Quest from "classes/Quest";



class CanAssignQuestsComponent {
  name:string;
  quests:Quest[];
  constructor(quests?: Quest[]) {
    // TODO validate, ensure we can't give identical quests
    this.name = CAN_ASSIGN_QUESTS_COMP;
    this.quests = quests;
  }
}

export default CanAssignQuestsComponent;