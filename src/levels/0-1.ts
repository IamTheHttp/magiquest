import map from './data/0-1.json';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {IDialogTrigger, IPortalTrigger} from "../interfaces/triggers.i";
import {IEntitiesToPlace, ILevelArea, PossibleTriggersArray} from "../interfaces/levels.i";
import {ISpawnableEnemies} from "../interfaces/interfaces";

export default {
  levelName: '0-1',
  locations: [],
  tileMap: map,
  triggers: {
    levelStart: [] as PossibleTriggersArray,
    actOnEntity: {},
    move: {
      '93-8': [{
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 0
      }] as PossibleTriggersArray,
      '-1--2': [{
        oneOff: true,
        type: 'dialog',
        lines: [
          {
            text: 'I should collect my sword\n(hit space to open chests)',
            speaker: 0
          }
        ]
      }] as PossibleTriggersArray
    }
  },
  entitiesToPlace: [] as IEntitiesToPlace,
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 5,
    row: 95
  }
} as ILevelArea;