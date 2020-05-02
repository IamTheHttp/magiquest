
import {CHARACTER_ATTRIBUTES_COMP} from './ComponentNamesConfig';
import {AllowedAttributes} from "../../data/attributesConfig";


export interface IAssignedCharacterAttributes {
  [AllowedAttributes.AGILITY]: number,
  [AllowedAttributes.STRENGTH]: number,
  [AllowedAttributes.WILL]: number,
  [AllowedAttributes.ENDURANCE]: number
}

class CharacterAttributesComponent {
  name:string;
  spendableAttributePoints: number;
  attributes: IAssignedCharacterAttributes;

  constructor() {
    this.name = CHARACTER_ATTRIBUTES_COMP;
    this.spendableAttributePoints = 0;
    this.attributes = {
      [AllowedAttributes.AGILITY]: 5,
      [AllowedAttributes.STRENGTH]: 5,
      [AllowedAttributes.WILL]: 5,
      [AllowedAttributes.ENDURANCE]: 5
    }
  }
}

export default CharacterAttributesComponent;