import oneMap from 'levels/data/0-0_home.json';
import {CHARACTERS} from 'gameEngine/gameConstants';
import twoMap from 'levels/data/0-1_adventure.json';

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
  spawnableEnemies: [],
  triggers: {
    levelStart: [],
    actOnEntity: {
      NPC_1: [
        {
          oneOff: true,
          type: 'dialog',
          lines: [
            {
              text: 'Hey Jenny!, I\'m so glad to see you!\n',
              speaker: 1
            },
            {
              text: 'Is everything okay?\nI had a very bad feeling this morning',
              speaker: 0
            },
            {
              text: 'I was taking a walk this morning in the valley,\nI was attacked by a horrible creature!',
              speaker: 1
            },
            {
              text: 'Please, take this sword!\nYou\'ll need it if you want to get to the town',
              speaker: 1
            }
          ]
        }
      ]
    },
    move: {
      '14-6': {
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
    col: 0,
    row: 0
  }
};