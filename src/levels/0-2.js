import tileMap from 'levels/data/0-2_valley';
import {CHARACTERS} from 'gameConstants';

export default {
  tileMap,
  spawnableEnemies: [
    {
      chance: 0.050,
      enemy: CHARACTERS.SENTRY
    }
  ],
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '21-0': {
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 3
      }
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 0,
    row: 3
  }
};