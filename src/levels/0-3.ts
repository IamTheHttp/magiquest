import tileMap from 'levels/data/0-3_town.json';
import {PossibleTriggersArray} from "../interfaces/levels.i";

export default {
  tileMap,
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '29-4': [{
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 4
      }] as PossibleTriggersArray
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 3,
    row: 7
  }
};