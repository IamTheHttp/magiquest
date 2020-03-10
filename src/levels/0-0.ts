import oneMap from './data/0-0.json';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {IDialogTrigger, IPortalTrigger} from "../interfaces/triggers.i";
import {IEntitiesToPlace, ILevelArea, PossibleTriggersArray} from "../interfaces/levels.i";
import {ISpawnableEnemies} from "../interfaces/interfaces";


let level:ILevelArea = {
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
          chance: 0.01,
          characterType: CHARACTERS.ENEMY,
          characterLevel: 1
        },
        {
          chance: 0.01,
          characterType: CHARACTERS.IMP,
          characterLevel: 1
        },
        {
          chance: 0.01,
          characterType: CHARACTERS.GARGOYLE,
          characterLevel: 1
        },
        {
          chance: 0.01,
          characterType: CHARACTERS.DEMON,
          characterLevel: 1
        },
        {
          chance: 0.01,
          characterType: CHARACTERS.DEMON,
          characterLevel: 1
        },
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
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_1'
    },
    {
      pos: {
        col: 13,
        row: 7
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_1'
    },
    {
      pos: {
        col: 18,
        row: 10
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_1'
    },
    {
      pos: {
        col: 5,
        row: 9
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_1'
    },
    {
      pos: {
        col: 62,
        row: 42
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_1'
    }
  ],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 4,
    row: 5
  }
};

export default level;