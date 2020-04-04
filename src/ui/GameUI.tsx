import * as React from "react";
import {IPlayerUIState} from "../interfaces/interfaces";


function GameUI(props: IPlayerUIState) {
  return (
    <div className='game-ui'>
      <div className='col'>
        <div className='bar'>
          <div className='bar__filled bar__filled health'
               style={{width: `${props.percentHealth * 100}%`}}/>
          <div className='stats'>{props.currentHealth} / {props.maxHealth}</div>
        </div>

        <div className='bar'>
          <div className='bar__filled xp'/>
        </div>
      </div>
      <div className='col'>Temp</div>
      <div className='col'>Temp</div>
    </div>
  );
}

export default GameUI;