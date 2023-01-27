import {SKILLS} from './_ComponentNames';
import {AllowedSkills} from '../../data/skillConfig';

class Skills {
  name: string;
  skills: AllowedSkills[];

  constructor() {
    this.name = SKILLS;
    this.skills = [];
  }
}

export default Skills;
