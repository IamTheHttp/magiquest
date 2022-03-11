import * as React from 'react';
import {IPlayerUIState} from '../../../interfaces/IGeneral';
import './GameUI.scss';
import {PlayerState} from '../../../gameEngine/classes/PlayerState';

interface IGameUIProps {
  onShowSkillsClicked: () => void;
  onShowAttributes: () => void;
}

function GameUI(props: IGameUIProps & PlayerState) {
  let canAssignAttrsClass = props.spendableAttributePoints > 0 ? 'active' : '';

  return (
    <div className="game-ui">
      <div className="sphere sphere--health">
        <div className="sphere__filled health" style={{maxHeight: `${(1 - props.percentHealth) * 100}%`}} />
        <div className="stats">
          {Math.floor(props.currentHealth)} / {props.maxHealth}
        </div>
      </div>

      <div className="bar">
        <div className="bar__filled bar__filled xp" style={{width: `${props.levelProgress * 100}%`}} />
        <div className="stats">{props.spendableXP}</div>
      </div>

      {/*<div className='game-options'>*/}
      {/*  <button className='game-option' onClick={props.onShowSkillsClicked}>Skills</button>*/}
      {/*  <button className='game-option' onClick={props.onShowSkillsClicked}>Quests</button>*/}
      {/*  <button className='game-option' onClick={props.onShowSkillsClicked}>Inventory</button>*/}
      {/*  <button className={`game-option ${canAssignAttrsClass}`} onClick={props.onShowAttributes}>Attributes</button>*/}
      {/*</div>*/}
    </div>
  );
}

export default GameUI;
