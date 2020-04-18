import {
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  PLAYER_CONTROLLED_COMP
} from 'gameEngine/components/ComponentNamesConfig';
import GAME_PLATFORM from 'game-platform';
import {ISystemArguments} from "../../../../interfaces/gameloop.i";
import Player from "entities/characters/Player";
import {IAction} from "../../../../interfaces/interfaces";
import {AllowedSkills, skillsConfig} from "../../../../data/skillConfig";
import {PlayerSkillsChangeEvent} from "classes/GameEvents";

let {entityLoop} = GAME_PLATFORM;


function buySkill(systemArguments: ISystemArguments, action: IAction) {
  let {Entity, levelArea, gameEvents} = systemArguments;
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as Player;

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