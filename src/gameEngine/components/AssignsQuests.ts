import {ASSIGNS_QUESTS} from './_ComponentNames';
import Quest from '../entities/Quest';

class AssignsQuests {
  name: string;
  quests: Quest[];
  constructor(quests?: Quest[]) {
    this.name = ASSIGNS_QUESTS;
    this.quests = quests;
  }
}

export default AssignsQuests;
