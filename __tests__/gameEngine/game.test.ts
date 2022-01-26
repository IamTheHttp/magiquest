import Game from '../../src/gameEngine/Game/Game';
import {AllowedLevelLocationIDs, RESOLUTION} from '../../src/gameEngine/gameConstants';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';

describe('Full integration test for game.ts', () => {
  let entity;
  beforeEach(() => {
    // setup the test
  });

  it('can initialize the game', () => {
    new Game({
      mode: 'playing',
      onAreaChange: function (level, area) {
        this.changeMap(level, area);
      }
    });
  });
});
