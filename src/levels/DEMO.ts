import { CHARACTERS } from 'gameEngine/gameConstants';
import {IDialogTrigger, IPortalTrigger} from "../interfaces/triggers.i";
import {IEntitiesToPlace, ILevelArea, PossibleTriggersArray} from "../interfaces/levels.i";


function generateMap(width: number, height: number) {
  let map = [];
  let row = 0;

  while (row < height) {
    map.push(new Array(width).fill(1));
    row++;
  }

  return map;
}

export default {
  noSpawnLocations:[],
  monsterDensity:0,
  spawnableEnemies:[],
  locations: [],
  levelAreaID: '0-0',
  tileMap: generateMap(100, 100),
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
      '14-13': [{
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 1
      }] as PossibleTriggersArray,
      '2-5': [{
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
        col: 3,
        row: 5
      },
      characterType: CHARACTERS.CHEST
    }
  ] as IEntitiesToPlace,
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 1,
    row: 2
  }
} as ILevelArea;