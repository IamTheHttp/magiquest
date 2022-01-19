import {AllowedSkills, AllowedTrees, ISkill} from '../../../data/skillConfig';
import {IPlayerUIState} from '../../../interfaces/interfaces';
import * as React from 'react';
import {ComponentProps} from 'react';

interface IRenderSkills extends ComponentProps<any> {
  activeSkillID: AllowedSkills;
  skillsToRender: ISkill[];
  currentPlayerState: IPlayerUIState;
  onSkillClick: (skillID: AllowedSkills) => void;
}

function RenderSkills(props: {
  activeSkillID: AllowedSkills;
  skillsToRender: ISkill[];
  currentPlayerState: IPlayerUIState;
  onSkillClick: (skillID: AllowedSkills) => void;
}) {
  let {skillsToRender} = props;

  if (skillsToRender.length > 0) {
    return (
      <div className="skills-grid">
        {skillsToRender.map((skill) => {
          let isOwnedClass = props.currentPlayerState.skills.includes(skill.id) ? 'owned' : '';
          let isFocusedClass = skill.id === props.activeSkillID ? 'clicked' : '';

          return (
            <div
              key={skill.id}
              className={`skill ${isOwnedClass} ${isFocusedClass}`}
              onClick={() => {
                props.onSkillClick(skill.id);
              }}
            >
              <span> {skill.name} </span> <span> ({skill.cost} XP) </span>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default RenderSkills;
