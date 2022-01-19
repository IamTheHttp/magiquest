import {CHARACTER_SKILLS_COMP} from './ComponentNamesConfig';
import {AllowedSkills} from '../../data/skillConfig';

class CharacterSkillsComponent {
  name: string;
  skills: AllowedSkills[];

  constructor() {
    this.name = CHARACTER_SKILLS_COMP;
    this.skills = [];
  }
}

export default CharacterSkillsComponent;
