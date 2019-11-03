import oneMap from 'levels/data/0-0_home';
import twoMap from 'levels/data/0-1_adventure';
import {CHARACTERS} from 'gameConstants';
import {bit} from 'config';


/**
 * @name levelArea
 * @property {Object} tileMap
 * @property {Object} portals
 * @property {Object} entitiesToPlace
 * @property {Object} startPos
 * @property {Array.<trigger>} triggers.levelStart
 * @property {Array.<trigger>} triggers.actOnEntity
 * @property {Array.<trigger>} triggers.move
 */

/**
 * @name trigger
 * @type {object}
 * @property {boolean} oneOff
 * @property {string} type
 * @property {object} data
 */


/**
 * @name levelConfig
 */
let levelConfig = {
  0: {
    areas: {
      0: {
        tileMap: oneMap,
        portals: {
          '13-14': { // tile on index 1-1 Y/X index
            target: {
              level: 1,
              area: 0
            }
          }
        },
        triggers: {
          levelStart: [{
            oneOff: true,
            type: 'dialog',
            lines: [
              {
                text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
                speaker: 0 // TODO - speaker 0 means player? =/
              }
            ]
          }],
          actOnEntity: {
            NPC_1: [{
              oneOff: true,
              type: 'dialog',
              lines: [
                {
                  text: 'Hey Jenny!, I\'m so glad to see you!\n',
                  speaker: 1
                },
                {
                  text: 'Is everything okay?\nI had a very bad feeling this morning',
                  speaker: 0 // so our player? TODO - is this the best way?
                },
                {
                  text: 'This morning I tried to gather berries from the valley ahead\nI was attacked by a horrible creature!',
                  speaker: 1
                }
              ]
            }],
            DOOR1: {}
          },
          move: {
            '5-5': {
              oneOff: true,
              type: 'portal',
              data: {
                level: 1,
                area: 0
              }
            }
          }
        },
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
        startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
          x: 48,
          y: 80
        }
      }
    }
  },
  1: {
    portals: [],
    areas: {
      0: {
        entitiesToPlace: [
          {
            type: CHARACTERS.FAM_NPC,
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
          move: {}
        },
        tileMap: twoMap,
        portals: {},
        startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
          x: 16,
          y: 16
        }
      }
    }
  }
};

export default levelConfig;