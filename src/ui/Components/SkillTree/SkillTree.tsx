import * as React from "react";
import './SkillTree.scss';
import {useState} from "react";
import {
  skillTreesConfig,
  AllowedSkills,
  AllowedTrees,
  ISkill,
  ISkillTree,
  skillsConfig,
} from "data/skillConfig";
import {IPlayerUIState} from "interfaces/interfaces";
import OptionsScreen from "../__Shared/OptionsScreen/OptionsScreen";
import RenderTitle from "./RenderTitle";
import RenderSkillTreeTabs from "./RenderSkillTreeTabs";
import RenderSkills from "./RenderSkills";
import RenderSkillDetails from "./RenderSkillDetails";
import getSkillsToRender from "./utils/getSkillsToRender";


export interface ISkillTreeProps {
  onCloseSkillTree: () => void;
  onBuySkillClick: (skillID: AllowedSkills) => void,
  currentPlayerState: IPlayerUIState
}

function SkillTree(props: ISkillTreeProps) {
  const [activeTreeID, setActiveSkillTree] = useState('') as unknown as [AllowedTrees, (a: AllowedTrees) => {}];
  const [activeSkillID, setActiveSkill] = useState('') as unknown as [AllowedSkills, (a: AllowedSkills) => {}];

  const skillsToRender = getSkillsToRender(skillTreesConfig[activeTreeID]);
  const currentPlayerState = props.currentPlayerState;
  const skill = skillsConfig[activeSkillID];

  return (
    <OptionsScreen className='skills-screen' onClose={props.onCloseSkillTree}>
      <RenderTitle spendableXP={currentPlayerState.spendableXP}/>
      <div>
        <RenderSkillTreeTabs
          setActiveSkillTree={(treeID) => {
            setActiveSkillTree(treeID);
            setActiveSkill(null);
          }}
          activeTreeID={activeTreeID}
        />
        <RenderSkills
          activeSkillID={activeSkillID}
          skillsToRender={skillsToRender}
          currentPlayerState={currentPlayerState}
          onSkillClick={(skillID) => {
            setActiveSkill(skillID);
          }}
        />
        <RenderSkillDetails
          currentPlayerState={currentPlayerState}
          skill={skill}
          activeSkillID={activeSkillID}
          onBuySkillClick={props.onBuySkillClick}/>
      </div>
    </OptionsScreen>
  )
}

export default SkillTree;