import {ISkill, ISkillTree} from "../../../../data/skillConfig";

/**
 *
 * @param treeToRender
 * @returns
 */
function getSkillsToRender(treeToRender: ISkillTree) {
  let skillsToRender: ISkill[] = [];
  if (treeToRender) {
    skillsToRender = treeToRender.skills;
  }

  return skillsToRender;
}

export default getSkillsToRender;