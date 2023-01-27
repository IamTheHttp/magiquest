import {ATTRIBUTES} from './_ComponentNames';
import {AllowedAttributes} from '../../data/attributesConfig';

export interface IAssignedCharacterAttributes {
  [AllowedAttributes.AGILITY]: number;
  [AllowedAttributes.STRENGTH]: number;
  [AllowedAttributes.WILL]: number;
  [AllowedAttributes.ENDURANCE]: number;
}

class Attributes {
  name: string;
  spendableAttributePoints: number;
  attributes: IAssignedCharacterAttributes;

  constructor() {
    this.name = ATTRIBUTES;
    this.spendableAttributePoints = 0;
    this.attributes = {
      [AllowedAttributes.AGILITY]: 5,
      [AllowedAttributes.STRENGTH]: 5,
      [AllowedAttributes.WILL]: 5,
      [AllowedAttributes.ENDURANCE]: 5
    };
  }
}

export default Attributes;
