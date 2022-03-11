import Game from '../../gameEngine/Game';
import {GameCanvas} from 'game-platform';
import * as React from 'react';

export function ManagedCanvas(props: {game: Game; gameCanvasManager: GameCanvas}) {
  const {game, gameCanvasManager} = props;
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

export const ManagedCanvasMemo = React.memo(ManagedCanvas);
