import * as React from "react";
import {IPlayerUIState} from "../../../interfaces/interfaces";
import './GameUI.scss';

interface IGameUIProps extends IPlayerUIState {
  onShowSkillsClicked: () => void;
  onShowAttributes: () => void;
}


function GameUI(props: IGameUIProps) {
  return (
    <div className='game-ui'>
      <h3>Health</h3>
      <div className='bar'>
        <div className='bar__filled bar__filled health' style={{width: `${props.percentHealth * 100}%`}}/>
        <div className='stats'>{props.currentHealth} / {props.maxHealth}</div>
      </div>

      <h3>Exp</h3>
      <div className='bar'>
        <div className='bar__filled bar__filled xp' style={{width: `${props.levelProgress * 100}%`}}/>
        <div className='stats'>{props.spendableXP}</div>
      </div>

      <div className='game-options'>
        <button className='game-option' onClick={props.onShowSkillsClicked}>Skills</button>
        <button className='game-option' onClick={props.onShowSkillsClicked}>Quests</button>
        <button className='game-option' onClick={props.onShowSkillsClicked}>Inventory</button>
        <button className='game-option' onClick={props.onShowAttributes}>Attributes</button>
      </div>
    </div>
  );
}

export default GameUI;