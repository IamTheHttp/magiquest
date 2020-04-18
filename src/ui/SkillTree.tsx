import * as React from "react";
import './SkillTree.scss';
import {useState} from "react";
import {
  skillTreesConfig,
  AllowedSkills,
  AllowedTrees,
  ISkill,
  ISkillTree,
  ISkillTreeConfig, skillsConfig,
} from "../data/skillConfig";
import {IPlayerUIState} from "../interfaces/interfaces";

export interface ISkillTreeProps {
  onCloseSkillTree: () => void;
  onBuySkillClick: (skillID: AllowedSkills) => void,
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

function getSkillsToRender(treeToRender: ISkillTree) {
  let skillsToRender: ISkill[] = [];
  if (treeToRender) {
    skillsToRender = treeToRender.skills;
  }

  return skillsToRender;
}

function renderSkills(props: {activeSkillID:AllowedSkills, skillsToRender: ISkill[], currentPlayerState: IPlayerUIState, onSkillClick: (skillID: AllowedSkills) => void }) {
  let {skillsToRender} = props;

  return skillsToRender.length > 0 && <div
    className='skills-grid'
  >
    {skillsToRender.map((skill) => {

      let isOwnedClass = props.currentPlayerState.skills.includes(skill.id) ? 'owned' : '';
      let isFocusedClass = skill.id === props.activeSkillID ? 'clicked' : '';

      return <div
        key={skill.id}
        className={`skill ${isOwnedClass} ${isFocusedClass}`}
        onClick={() => {
          props.onSkillClick(skill.id);
        }}
      >
        <span> {skill.name} </span> <span> ({skill.cost} XP) </span>
      </div>
    })}
  </div>
}


interface IRenderSkillTreeTabs {
  setActiveSkillTree(a: AllowedTrees): void;

  activeTreeID: AllowedTrees
}

function renderSkillTreeTabs(props: IRenderSkillTreeTabs) {
  const {setActiveSkillTree, activeTreeID} = props;
  const arrSkillTrees = skillConfigToArray(skillTreesConfig);

  return <div className='row skill-tabs' onClick={(e) => {
    let el = e.target as HTMLElement;
    let treeID = el.getAttribute('data-id') as AllowedTrees;
    setActiveSkillTree(treeID);
  }}>
    {arrSkillTrees.map((skillTree) => {
      return (
        <div
          key={skillTree.id}
          className={`skill-tab ${activeTreeID === skillTree.id ? 'active' : ''}`}
          data-id={skillTree.id}>{skillTree.name}
        </div>
      )
    })}
  </div>
}

function renderCloseButton(props: { spendableXP: number, onCloseSkillTree: () => void }) {
  return <div className='close-container'>
    <h3>Purchase Skills <span className='remaining-xp'>({props.spendableXP} XP remaining)</span></h3>
    <button className='close' onClick={props.onCloseSkillTree}>&times;</button>
  </div>
}

function renderSkillDetails(props: { currentPlayerState: IPlayerUIState, skill: ISkill, activeSkillID: AllowedSkills, onBuySkillClick: (skillID: AllowedSkills) => void }) {
  if (props.activeSkillID) {
    let enoughXPToBuy = props.currentPlayerState.spendableXP > props.skill.cost;
    let playerOwnsSkill = props.currentPlayerState.skills.includes(props.skill.id);

    let btnTxt = '';

    if (playerOwnsSkill) {
      btnTxt = 'You own this skill';
    } else if (enoughXPToBuy){
      btnTxt = 'Buy';
    } else {
      btnTxt = 'Not enough XP';
    }

    return <div className='skill-details'>
      <h3>{props.skill.name}</h3>
      <div>
        {props.skill.description}
      </div>
      <div>
        <button
          disabled={!enoughXPToBuy || playerOwnsSkill}
          onClick={() => {
            props.onBuySkillClick(props.skill.id)
          }}>
          {btnTxt}</button>
      </div>
    </div>
  }
}

function SkillTree(props: ISkillTreeProps) {
  const [activeTreeID, setActiveSkillTree] = useState('') as unknown as [AllowedTrees, (a: AllowedTrees) => {}];
  const [activeSkillID, setActiveSkill] = useState('') as unknown as [AllowedSkills, (a: AllowedSkills) => {}];
  const skillsToRender = getSkillsToRender(skillTreesConfig[activeTreeID]);
  const currentPlayerState = props.currentPlayerState;
  const skill = skillsConfig[activeSkillID];

  return (
    <div className='skill-tree'>
      {renderCloseButton({spendableXP: currentPlayerState.spendableXP, onCloseSkillTree: props.onCloseSkillTree})}
      {renderSkillTreeTabs({setActiveSkillTree: (treeID) => {
          setActiveSkillTree(treeID);
          setActiveSkill(null);
        }, activeTreeID})}
      {renderSkills({
        activeSkillID,
        skillsToRender, currentPlayerState, onSkillClick: (skillID) => {
          setActiveSkill(skillID);
        }
      })}

      {renderSkillDetails({
        currentPlayerState: props.currentPlayerState,
        skill,
        activeSkillID,
        onBuySkillClick: (skillID) => {
          props.onBuySkillClick(skillID);
        }
      })}
    </div>
  );
}

export default SkillTree;