import * as React from "react";
import './SkillTree.scss';
import {useState} from "react";

interface ISkillTreeProps {
  onCloseSkillTree: () => void;
}


export enum AllowedTrees {
  MAGIC = 'MAGIC',
  TECH = 'TECH',
  ZEN = 'ZEN',
  FORCE = 'FORCE'
}

export enum AllowedSkills {
  FIRE_BULLET = 'FIRE_BULLET',
}



export interface ISkill {
  id:AllowedSkills,
  name: string,
  cost: number
}

export interface ISkillTree {
  id: AllowedTrees,
  name: string,
  skills: ISkill[]
}
export type ISkillTreeConfig = {
  [key in AllowedTrees]: ISkillTree
}

let skillTreesConfig: ISkillTreeConfig = {
  [AllowedTrees.MAGIC]: {
    id: AllowedTrees.MAGIC,
    name: 'Magic',
    skills: [
      {
        id: AllowedSkills.FIRE_BULLET,
        name: 'Fire Bullet',
        cost: 100
      }
    ]
  },
  [AllowedTrees.FORCE]: {
    id: AllowedTrees.FORCE,
    name: 'Force',
    skills: []
  },
  [AllowedTrees.ZEN]: {
    id: AllowedTrees.ZEN,
    name: 'Zen',
    skills: []
  },
  [AllowedTrees.TECH]: {
    id: AllowedTrees.TECH,
    name: 'Tech',
    skills: []
  }
};




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
          return <div key={skill.id}>
            <span> {skill.name} </span> <span> {skill.cost} </span>
          </div>
        })}
      </div>}
    </div>
  );
}

export default SkillTree;