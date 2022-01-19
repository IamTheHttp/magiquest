export enum AllowedAttributes {
  STRENGTH = 'STRENGTH',
  AGILITY = 'AGILITY',
  WILL = 'WILL',
  ENDURANCE = 'ENDURANCE'
}

interface CharacterAttribute {
  id: AllowedAttributes;
  displayName: string;
  description: string;
}

export type ICharacterAttributesConfig = {
  [key in AllowedAttributes]: CharacterAttribute;
};

let characterAttributesConfig: ICharacterAttributesConfig = {
  [AllowedAttributes.AGILITY]: {
    id: AllowedAttributes.AGILITY,
    displayName: 'Agility',
    description: 'Agility'
  },
  [AllowedAttributes.STRENGTH]: {
    id: AllowedAttributes.STRENGTH,
    displayName: 'STRENGTH',
    description: 'STRENGTH'
  },
  [AllowedAttributes.WILL]: {
    id: AllowedAttributes.WILL,
    displayName: 'WILL',
    description: 'WILL'
  },
  [AllowedAttributes.ENDURANCE]: {
    id: AllowedAttributes.ENDURANCE,
    displayName: 'ENDURANCE',
    description: 'ENDURANCE'
  }
};

export {characterAttributesConfig};
