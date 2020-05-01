import {AllowedTrees, skillTreesConfig} from "../../../data/skillConfig";
import * as React from "react";
import {ComponentProps} from "react";
import skillConfigToArray from "./utils/skillConfigToArray";


interface IRenderSkillTreeTabs extends ComponentProps <any> {
  setActiveSkillTree(a: AllowedTrees): void;
  activeTreeID: AllowedTrees
}

function RenderSkillTreeTabs(props: IRenderSkillTreeTabs) {
  const {setActiveSkillTree, activeTreeID} = props;
  const arrSkillTrees = skillConfigToArray(skillTreesConfig);

  return (
    <div className='row skill-tabs' onClick={(e) => {
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
  )
}

export default RenderSkillTreeTabs;