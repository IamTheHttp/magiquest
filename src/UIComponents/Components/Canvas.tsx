import Game from '../../gameEngine/Game';
import {GameCanvas} from 'game-platform';
import * as React from 'react';

/**
 * Used to memo
 * @param props
 * @constructor
 */
export function Canvas({game, gameCanvasManager}: {game: Game; gameCanvasManager: GameCanvas}) {
  return (
    <canvas
      ref={(el) => {
        if (el) {
          const mapAPI = gameCanvasManager.registerMapCanvas(el);
          game.setMapAPI(mapAPI);
          game.loadCurrentZone({});
          game.resume();
        }
      }}
    />
  );
}

export const CanvasMemo = React.memo(Canvas);
