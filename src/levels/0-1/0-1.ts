import map from './0-1.map.json';
import {CHARACTERS} from 'gameConstants';
import {IDialogTrigger, IPortalTrigger} from "../../interfaces/triggers.i";
import {IEntitiesToPlace, ILevelArea, PossibleTriggersArray} from "../../interfaces/levels.i";
import {ISpawnableEnemies} from "../../interfaces/interfaces";

let level: ILevelArea = {
  levelName: '0-1',
  locations: [],
  tileMap: map,
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '93-8': [{
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 0
      }],
      '-1--2': [{
        oneOff: true,
        type: 'dialog',
        lines: [
          {
            text: 'I should collect my sword\n(hit space to open chests)',
            speaker: 0
          }
        ]
      }]
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 5,
    row: 95
  }
};

export default level