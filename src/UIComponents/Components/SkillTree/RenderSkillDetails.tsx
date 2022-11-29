import {IPlayerUIState} from '../../../interfaces/IGeneral';
import {AllowedSkills, ISkill} from '../../../data/skillConfig';
import * as React from 'react';
import {ComponentProps} from 'react';

interface IRenderSkillDetails extends ComponentProps<any> {
  currentPlayerState: IPlayerUIState;
  skill: ISkill;
  activeSkillID: keyof typeof AllowedSkills;
  onBuySkillClick: (skillID: keyof typeof AllowedSkills) => void;
}

function RenderSkillDetails(props: IRenderSkillDetails) {
  if (props.activeSkillID) {
    let enoughXPToBuy = props.currentPlayerState.spendableXP > props.skill.cost;
    let playerOwnsSkill = props.currentPlayerState.skills.includes(props.skill.id);

    let btnTxt = '';

    if (playerOwnsSkill) {
      btnTxt = 'You own this skill';
    } else if (enoughXPToBuy) {
      btnTxt = 'Buy';
    } else {
      btnTxt = 'Not enough XP';
    }

    return (
      <div className="skill-details">
        <h3>{props.skill.name}</h3>
        <div>{props.skill.description}</div>
        <div>
          <button
            disabled={!enoughXPToBuy || playerOwnsSkill}
            onClick={() => {
              props.onBuySkillClick(props.skill.id);
            }}
          >
            {btnTxt}
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default RenderSkillDetails;
