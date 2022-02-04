import {
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  PLAYER_CONTROLLED_COMP
} from 'gameEngine/components/ComponentNamesConfig';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';
import {AllowedSkills, skillsConfig} from '../../../../data/skillConfig';
import Player from '../../../entities/characters/Player';
import {BaseEntity} from '../../../BaseEntity';
import {PlayerSkillsChangeEvent} from '../../../classes/GameEvents';

function buySkill(systemArguments: ISystemArguments, action: IAction) {
  let {Entity, gameEvents} = systemArguments;
  let player = Entity.getByComp<Player>(PLAYER_CONTROLLED_COMP)[0];

  // TODO how can we improve type safety here?
  if (action.data && action.data.skillID) {
    let skillID = action.data.skillID as AllowedSkills;

    let hasSkill = player[CHARACTER_SKILLS_COMP].skills.includes(skillID);
    if (!hasSkill) {
      let skill = skillsConfig[skillID];
      if (player[EXPERIENCE_COMP].XP > skill.cost) {
        player[CHARACTER_SKILLS_COMP].skills.push(skillID);
        player[EXPERIENCE_COMP].XP -= skill.cost;

        gameEvents.pushEvent(new PlayerSkillsChangeEvent(player));
      }
    }
  }
}

export default buySkill;
