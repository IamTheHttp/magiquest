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