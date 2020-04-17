
export enum AllowedTrees {
  MAGIC = 'MAGIC',
  TECH = 'TECH',
  ZEN = 'ZEN',
  FORCE = 'FORCE'
}

export enum AllowedSkills {
  FIRE_BULLET = 'FIRE_BULLET',
}



export interface ISkill {
  id:AllowedSkills,
  name: string,
  cost: number
}

export interface ISkillTree {
  id: AllowedTrees,
  name: string,
  skills: ISkill[]
}
export type ISkillTreeConfig = {
  [key in AllowedTrees]: ISkillTree
}

let skillTreesConfig: ISkillTreeConfig = {
  [AllowedTrees.MAGIC]: {
    id: AllowedTrees.MAGIC,
    name: 'Magic',
    skills: [
      {
        id: AllowedSkills.FIRE_BULLET,
        name: 'Fire Bullet',
        cost: 100
      }
    ]
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


export default skillTreesConfig;