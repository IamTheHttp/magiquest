import tileMap from 'levels/data/0-2_valley.json';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {ISpawnableEnemies} from "../interfaces/interfaces";
import {PossibleTriggersArray} from "../interfaces/levels.i";

export default {
  tileMap,
  spawnableEnemies: [
    {
      chance: 0.050,
      enemy: CHARACTERS.SENTRY
    }
  ] as ISpawnableEnemies,
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '21-0': [{
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 3
      }] as PossibleTriggersArray
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 0,
    row: 3
  }
};