import * as React from "react";
import './SkillTree.scss';
import {useState} from "react";
import skillTreesConfig, {
  AllowedSkills,
  AllowedTrees,
  ISkill,
  ISkillTree,
  ISkillTreeConfig,
} from "../data/skillConfig";
import {IPlayerUIState} from "../interfaces/interfaces";

export interface ISkillTreeProps {
  onCloseSkillTree: () => void;
  onSkillClick: (skillID: AllowedSkills) => void,
  currentPlayerState: IPlayerUIState
}


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
      })
    }
  }

  return arrSkillTrees;
}

function getSkillsToRender(treeToRender:ISkillTree) {
  let skillsToRender:ISkill[] = [];
  if (treeToRender) {
    skillsToRender = treeToRender.skills;
  }

  return skillsToRender;
}


function SkillTree(props: ISkillTreeProps) {
  const [activeTreeID, setActiveSkillTree] = useState('') as unknown as [AllowedTrees, (a: AllowedTrees) => {}];
  const arrSkillTrees = skillConfigToArray(skillTreesConfig);
  const skillsToRender = getSkillsToRender(skillTreesConfig[activeTreeID]);

  console.log(props.currentPlayerState);
  return (
    <div className='skill-tree'>

      <div className='close-container'>
        <button className='close' onClick={props.onCloseSkillTree}>&times;</button>
      </div>

      <div className='row skill-tabs' onClick={(e) => {
        let el = e.target as HTMLElement;
        let treeID = el.getAttribute('data-id') as AllowedTrees;
        setActiveSkillTree(treeID);
      }}>
        {arrSkillTrees.map((skillTree) => {
          return (
            <div
              key={skillTree.id}
              className={`skill-tab ${activeTreeID === skillTree.id ? 'active': ''}` }
              data-id={skillTree.id}>{skillTree.name}
            </div>
          )
        })}
      </div>

      {skillsToRender.length > 0 && <div>
        {skillsToRender.map((skill) => {
          return <div
            key={skill.id}
            className={`skill ${props.currentPlayerState.skills.includes(skill.id) ? 'owned' : ''} `}
            onClick={() => {
              props.onSkillClick(skill.id);
            }}
          >
            <span> {skill.name} </span> <span> {skill.cost} </span>
          </div>
        })}
      </div>}
    </div>
  );
}

export default SkillTree;