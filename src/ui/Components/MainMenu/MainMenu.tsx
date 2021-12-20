import * as React from "react";
import './MainMenu.scss';


interface MainMenuProps {
  startNewGame: () => void
}

export function MainMenu (props: MainMenuProps) {
  return (
    <div className={'main-menu'}>
      <div className={"main-menu__btn-container"}>
        <h1 className={'main-menu__game-title'}>MagiQuest</h1>
        <button onClick={props.startNewGame}>New game</button>
        <button>Help</button>
        <button>About</button>
      </div>
    </div>
  )
}
