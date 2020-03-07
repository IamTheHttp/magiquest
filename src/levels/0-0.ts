import oneMap from './data/0-0.json';
import { CHARACTERS } from 'gameEngine/gameConstants';
import {IDialogTrigger, IPortalTrigger} from "../interfaces/triggers.i";
import {IEntitiesToPlace, ILevelArea, PossibleTriggersArray} from "../interfaces/levels.i";

export default {
  levelName: '0-0',
  tileMap: oneMap,
  spawnableEnemies:[],
  triggers: {
    levelStart: [{
      oneOff: true,
      type: 'dialog',
      lines: [
        {
          text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
          speaker: 0
        }
      ]
    }] as PossibleTriggersArray,
    actOnEntity: {},
    move: {
      '-1--1': [{
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 1
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
  entitiesToPlace: [
    // {
    //   pos: {
    //     col: 3,
    //     row: 5
    //   },
    //   type: CHARACTERS.CHEST
    // }
  ] as IEntitiesToPlace,
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 4,
    row: 5
  }
} as ILevelArea;