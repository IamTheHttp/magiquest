import React, {useEffect, useRef, useState, useLayoutEffect, useMemo, ReactElement} from 'react';
import {ComponentProps} from 'react';
import {IPlayerState, IPlayerUIState} from '../../../interfaces/IGeneral';
import Game from '../../../gameEngine/Game';
import {PlayerState, PlayerStateChangeEvent} from '../../../gameEngine/classes/PlayerState';
import {AllowedAttributes} from '../../../data/attributesConfig';

function getDefaultPlayerState(): IPlayerState {
  return {
    maxHealth: 0,
    currentHealth: 0,
    percentHealth: 0,
    skills: [],
    spendableXP: 0, // TODO this is just XP, refactor the name 'spendable'
    levelProgress: 0,
    spendableAttributePoints: 0,
    attributes: {
      [AllowedAttributes.AGILITY]: 0, // assigned when game starts by game event
      [AllowedAttributes.STRENGTH]: 0, // assigned when game starts by game event
      [AllowedAttributes.WILL]: 0, // assigned when game starts by game event
      [AllowedAttributes.ENDURANCE]: 0 // assigned when game starts by game event
    }
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
      let newPlayerState: PlayerState = {
        maxHealth: event.maxHealth,
        currentHealth: event.currentHealth,
        percentHealth: event.percentHealth,
        skills: event.skills,
        spendableXP: event.spendableXP,
        levelProgress: event.levelProgress,
        attributes: event.attributes,
        spendableAttributePoints: event.spendableAttributePoints
      };

      setPlayerState(newPlayerState);
    });

    // After the registration for the game events is done, we can let the game know the UI is ready.
    props.game.notifyGame('UI_READY');
  }, []);

  return <div className={'main-overlay'}>{props.children}</div>;
}
