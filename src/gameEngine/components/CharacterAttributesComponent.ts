
import {CHARACTER_ATTRIBUTES_COMP} from './ComponentNamesConfig';
import {AllowedSkills, ISkillsConfig} from "../../data/skillConfig";

export enum AllowedAttributes {
  STRENGTH = 'STRENGTH',
  AGILITY = 'AGILITY',
  WILL = 'WILL',
  ENDURANCE = 'ENDURANCE'
}

interface CharacterAttribute {
  id: AllowedAttributes,
  name: string,
  description: string
}



export type ICharacterAttributesConfig = {
  [key in AllowedAttributes] : CharacterAttribute
}

let characterAttributesConfig: ICharacterAttributesConfig = {
  [AllowedAttributes.AGILITY]: {
    id: AllowedAttributes.AGILITY,
    name: 'Agility',
    description: 'Agility'
  },
  [AllowedAttributes.STRENGTH]: {
    id: AllowedAttributes.STRENGTH,
    name: 'STRENGTH',
    description: 'STRENGTH'
  },
  [AllowedAttributes.WILL]: {
    id: AllowedAttributes.WILL,
    name: 'WILL',
    description: 'WILL'
  },
  [AllowedAttributes.ENDURANCE]: {
    id: AllowedAttributes.ENDURANCE,
    name: 'ENDURANCE',
    description: 'ENDURANCE'
  }
};


export interface IAssignedCharacterAttributes {
  [AllowedAttributes.AGILITY]: number,
  [AllowedAttributes.STRENGTH]: number,
  [AllowedAttributes.WILL]: number,
  [AllowedAttributes.ENDURANCE]: number
}

class CharacterAttributesComponent {
  name:string;
  attributes: IAssignedCharacterAttributes;

  constructor() {
    this.name = CHARACTER_ATTRIBUTES_COMP;
    this.attributes = {
      [AllowedAttributes.AGILITY]: 5,
      [AllowedAttributes.STRENGTH]: 5,
      [AllowedAttributes.WILL]: 5,
      [AllowedAttributes.ENDURANCE]: 5
    }
  }
}

export default CharacterAttributesComponent;