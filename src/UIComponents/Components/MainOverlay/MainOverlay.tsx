import React, {useEffect, useState, ComponentProps} from 'react';
import {IPlayerState} from '../../../interfaces/IGeneral';
import Game from '../../../gameEngine/Game';
import {PlayerState} from '../../../gameEngine/classes/PlayerState';

function getDefaultPlayerState(): IPlayerState {
  return {
    maxHealth: 0,
    currentHealth: 0,
    percentHealth: 0,
    spendableXP: 0, // TODO this is just XP, refactor the name 'spendable'
    levelProgress: 0
  };
}

interface MainOverlayProps extends ComponentProps<any> {
  game: Game;
}

/**
 * The game overlay that's over the canvas
 * @param props
 * @constructor
 */
export function MainOverlay(props: MainOverlayProps) {
  const [playerState, setPlayerState] = useState<PlayerState>(getDefaultPlayerState());

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  useEffect(() => {
    props.game.setGameEventListener((event) => {
      const newPlayerState: PlayerState = {
        maxHealth: event.maxHealth,
        currentHealth: event.currentHealth,
        percentHealth: event.percentHealth,
        spendableXP: event.spendableXP,
        levelProgress: event.levelProgress
      };

      setPlayerState(newPlayerState);
    });

    // After the registration for the game events is done, we can let the game know the UI is ready.
    props.game.notifyGame('UI_READY');
  }, []);

  return <div className={'main-overlay'}>{props.children}</div>;
}
