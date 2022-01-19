import {AllowedTrees, ISkillTree, ISkillTreeConfig} from '../../../../data/skillConfig';

function skillConfigToArray(skillTreesConfig: ISkillTreeConfig) {
  let arrSkillTrees: ISkillTree[] = [];
  let treeID: AllowedTrees;

  for (treeID in skillTreesConfig) {
    if (skillTreesConfig.hasOwnProperty(treeID)) {
      let skillTree = skillTreesConfig[treeID];
      arrSkillTrees.push({
        id: treeID,
        name: skillTree.name,
        skills: skillTree.skills
      });
    }
  }

  return arrSkillTrees;
}

export default skillConfigToArray;
