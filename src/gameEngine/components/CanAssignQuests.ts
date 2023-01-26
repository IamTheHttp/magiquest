import {CAN_ASSIGN_QUESTS} from './_ComponentNamesConfig';
import Quest from '../entities/Quest';

class CanAssignQuests {
  name: string;
  quests: Quest[];
  constructor(quests?: Quest[]) {
    this.name = CAN_ASSIGN_QUESTS;
    this.quests = quests;
  }
}

export default CanAssignQuests;
