import oneMap from './data/0-0.json';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {IDialogTrigger, IPortalTrigger} from "../interfaces/triggers.i";
import {IEntitiesToPlace, ILevelArea, PossibleTriggersArray} from "../interfaces/levels.i";
import {ISpawnableEnemies} from "../interfaces/interfaces";

export default {
  levelName: '0-0',
  locations: [
    {
      spawnableEnemies: [],
      name: 'town',
      start: {
        col: 0,
        row: 0,
      },
      end: {
        col: 32,
        row: 18,
      }

    },
    {
      spawnableEnemies: [
        {
          chance: 0.02,
          enemy: CHARACTERS.SENTRY
        }
      ],
      name: 'town',
      start: {
        col: 32,
        row: 0,
      },
      end: {
        col: 100,
        row: 18,
      }

    }
  ],
  tileMap: oneMap,
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
      '8-7': [{
        oneOff: false,
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
    {
      pos: {
        col: 8,
        row: 4
      },
      type: CHARACTERS.FAM_NPC
    },
    {
      pos: {
        col: 13,
        row: 7
      },
      type: CHARACTERS.FAM_NPC
    },
    {
      pos: {
        col: 18,
        row: 10
      },
      type: CHARACTERS.FAM_NPC
    },
    {
      pos: {
        col: 5,
        row: 9
      },
      type: CHARACTERS.FAM_NPC
    },
    {
      pos: {
        col: 62,
        row: 42
      },
      type: CHARACTERS.FAM_NPC
    }
  ] as IEntitiesToPlace,
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 4,
    row: 5
  }
} as ILevelArea;