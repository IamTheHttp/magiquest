import * as React from "react";
import {IPlayerUIState} from "../interfaces/interfaces";


function GameUI(props: IPlayerUIState) {
  return (
    <div className='game-ui'>
      <h3>Health</h3>
      <div className='bar'>
        <div className='bar__filled bar__filled health'
             style={{width: `${props.percentHealth * 100}%`}}/>
        <div className='stats'>{props.currentHealth} / {props.maxHealth}</div>
      </div>

      <h3>Exp</h3>
      <div className='bar'>
        <div className='bar__filled xp'/>
      </div>
    </div>
  );
}

export default GameUI;