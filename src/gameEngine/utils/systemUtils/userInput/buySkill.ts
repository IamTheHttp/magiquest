import {SKILLS, EXPERIENCE, PLAYER_CONTROLLED} from 'gameEngine/components/_ComponentNames';
import {ISystemArguments} from '../../../../interfaces/IGameLoop';
import {IAction} from '../../../../interfaces/IGeneral';
import {AllowedSkills, skillsConfig} from '../../../../data/skillConfig';
import Player from '../../../entities/placeableEntities/Player';
import {BaseEntity} from '../../../BaseEntity';
import {PlayerSkillsChangeEvent} from '../../../classes/GameEvents';

function buySkill(systemArguments: ISystemArguments, action: IAction) {
  let {Entity, gameEvents} = systemArguments;
  let player = Entity.getByComp<Player>(PLAYER_CONTROLLED)[0];

  // TODO how can we improve type safety here?
  if (action.data && action.data.skillID) {
    let skillID = action.data.skillID as AllowedSkills;

    let hasSkill = player[SKILLS].skills.includes(skillID);
    if (!hasSkill) {
      let skill = skillsConfig[skillID];
      if (player[EXPERIENCE].XP > skill.cost) {
        player[SKILLS].skills.push(skillID);
        player[EXPERIENCE].XP -= skill.cost;

        gameEvents.pushEvent(new PlayerSkillsChangeEvent(player));
      }
    }
  }
}

export default buySkill;
