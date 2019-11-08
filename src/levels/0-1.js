import oneMap from 'levels/data/0-0_home';
import {CHARACTERS} from 'gameConstants';
import twoMap from 'levels/data/0-1_adventure';

export default {
  entitiesToPlace: [
    {
      type: CHARACTERS.FAM_NPC,
      name: 'NPC_1',
      pos: {
        col: 5,
        row: 4
      }
    }
  ],
  spawnableEnemies: [
    {
      chance: 0.005,
      enemy: CHARACTERS.SENTRY
    }
  ],
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '14-14': {
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 2
      }
    }
  },
  tileMap: twoMap,
  portals: {},
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    x: 16,
    y: 16
  }
};