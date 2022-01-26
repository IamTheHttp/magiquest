import React, {useEffect, useRef, useState} from 'react';
import {ComponentProps} from 'react';
import GameUI from '../GameUI/GameUI';
import {IPlayerState, IPlayerUIState} from '../../../interfaces/interfaces';
import Game from '../../../gameEngine/Game/Game';
import {PlayerState} from '../../../gameEngine/classes/PlayerState';
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
  }, []);

  return (
    <div>
      {props.game.mode === 'playing' && (
        <GameUI
          {...playerState}
          onShowSkillsClicked={() => {
            this.toggleUIPlayerState('showSkillTree');
          }}
          onShowAttributes={() => {
            this.toggleUIPlayerState('showAttributes');
          }}
        />
      )}
      {props.children}
    </div>
  );
}
