export enum AllowedTrees {
  MAGIC = 'MAGIC',
  TECH = 'TECH',
  ZEN = 'ZEN',
  FORCE = 'FORCE'
}

export interface ISkill {
  id: keyof typeof AllowedSkills;
  name: string;
  cost: number;
  description: string;
}

export interface ISkillTree {
  id: keyof typeof AllowedTrees;
  name: string;
  skills: ISkill[];
}

export enum AllowedSkills {
  FIRE_BULLET = 'FIRE_BULLET',
  SUPER_NOVA = 'SUPER_NOVA'
}

export type ISkillsConfig = {
  [key in AllowedSkills]: ISkill;
};

let skillsConfig: ISkillsConfig = {
  [AllowedSkills.FIRE_BULLET]: {
    id: AllowedSkills.FIRE_BULLET,
    name: 'Fire Bullet',
    cost: 100,
    description: 'Fire a bullet of fire at your enemies'
  },
  [AllowedSkills.SUPER_NOVA]: {
    id: AllowedSkills.SUPER_NOVA,
    name: 'SuperNova',
    cost: 550,
    description: 'An engulfing nova to scorch your enemies'
  }
};

export type ISkillTreeConfig = {
  [key in AllowedTrees]: ISkillTree;
};

let skillTreesConfig: ISkillTreeConfig = {
  [AllowedTrees.MAGIC]: {
    id: AllowedTrees.MAGIC,
    name: 'Magic',
    skills: [skillsConfig[AllowedSkills.FIRE_BULLET], skillsConfig[AllowedSkills.SUPER_NOVA]]
  },
  [AllowedTrees.FORCE]: {
    id: AllowedTrees.FORCE,
    name: 'Force',
    skills: []
  },
  [AllowedTrees.ZEN]: {
    id: AllowedTrees.ZEN,
    name: 'Zen',
    skills: []
  },
  [AllowedTrees.TECH]: {
    id: AllowedTrees.TECH,
    name: 'Tech',
    skills: []
  }
};

export {skillTreesConfig, skillsConfig};
