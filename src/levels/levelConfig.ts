import oneMap from 'levels/data/0-0_home.json';
import twoMap from 'levels/data/0-1_adventure.json';
import {CHARACTERS} from 'gameEngine/gameConstants';
import {bit} from 'gameEngine/config';
import {ILevelArea} from "../interfaces/levels.i";
// TODO - Ensure all tests pass!

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


// TODO move to some util
function hasValue(x: any) {
  return typeof x !== 'undefined' && typeof x !== null;
}

// take all files
// TODO this should be some interface
let levelConfig = {} as {
  [numLevel: number]: {
    areas: {
      [numArea: number]: ILevelArea;
    }
  };
};

// levelConfig[numLevel] = levelConfig[numLevel] || { areas: {}};
// levelConfig[numArea].areas[numArea] = ctx(path).default;

// TOOD create a live object based on these levels
function requireAllMapLevels() {
  let ctx = require.context('levels', true, /\.ts$/);

  ctx.keys().forEach((path) => {
    let name = path.replace('./', '').replace('.ts', '');
    let [level, area] = name.split('-');

    if (hasValue(level) && hasValue(area)) {
      let numLevel = +level;
      let numArea = +area;
      levelConfig[numLevel] = levelConfig[numLevel] || {areas: {}};
      levelConfig[numLevel].areas[numArea] = ctx(path).default;
    }
  });
}

requireAllMapLevels();

/**
 * @name levelConfig
 */
// let levelConfig = {
//   0: {
//     areas: {
//       0: {
//         tileMap: oneMap,
//         triggers: {
//           levelStart: [{
//             oneOff: true,
//             type: 'dialog',
//             lines: [
//               {
//                 text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
//                 speaker: 0
//               }
//             ]
//           }],
//           actOnEntity: {},
//           move: {
//             '13-14': {
//               oneOff: true,
//               type: 'portal',
//               level: 0,
//               area: 1
//             }
//           }
//         },
//         entitiesToPlace: [],
//         startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
//           x: 48,
//           y: 80
//         }
//       },
//       1: {
//         entitiesToPlace: [
//           {
//             type: CHARACTERS.FAM_NPC,
//             name: 'NPC_1',
//             pos: {
//               col: 5,
//               row: 4
//             }
//           }
//         ],
//         spawnableEnemies: [
//           {
//             chance: 0.005,
//             enemy: CHARACTERS.SENTRY
//           }
//         ],
//         triggers: {
//           levelStart: [],
//           actOnEntity: {
//
//           },
//           move: {
//             '14-14': {
//               oneOff: true,
//               type: 'portal',
//               level: 0,
//               area: 1
//             }
//           }
//         },
//         tileMap: twoMap,
//         portals: {},
//         startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
//           x: 16,
//           y: 16
//         }
//       },
//       2: {
//         entitiesToPlace: [
//           {
//             type: CHARACTERS.FAM_NPC,
//             name: 'NPC_1',
//             pos: {
//               col: 5,
//               row: 4
//             }
//           }
//         ],
//         spawnableEnemies: [
//           {
//             chance: 0.005,
//             enemy: CHARACTERS.SENTRY
//           }
//         ],
//         triggers: {
//           levelStart: [],
//           actOnEntity: {
//
//           },
//           move: {
//             '14-14': {
//               oneOff: true,
//               type: 'portal',
//               level: 0,
//               area: 1
//             }
//           }
//         },
//         tileMap: twoMap,
//         portals: {},
//         startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
//           x: 16,
//           y: 16
//         }
//       },
//       3: {
//         entitiesToPlace: [
//           {
//             type: CHARACTERS.FAM_NPC,
//             name: 'NPC_1',
//             pos: {
//               col: 5,
//               row: 4
//             }
//           }
//         ],
//         spawnableEnemies: [
//           {
//             chance: 0.005,
//             enemy: CHARACTERS.SENTRY
//           }
//         ],
//         triggers: {
//           levelStart: [],
//           actOnEntity: {
//
//           },
//           move: {
//             '14-14': {
//               oneOff: true,
//               type: 'portal',
//               level: 0,
//               area: 1
//             }
//           }
//         },
//         tileMap: twoMap,
//         portals: {},
//         startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
//           x: 16,
//           y: 16
//         }
//       },
//       4: {
//         entitiesToPlace: [
//           {
//             type: CHARACTERS.FAM_NPC,
//             name: 'NPC_1',
//             pos: {
//               col: 5,
//               row: 4
//             }
//           }
//         ],
//         spawnableEnemies: [
//           {
//             chance: 0.005,
//             enemy: CHARACTERS.SENTRY
//           }
//         ],
//         triggers: {
//           levelStart: [],
//           actOnEntity: {
//
//           },
//           move: {
//             '14-14': {
//               oneOff: true,
//               type: 'portal',
//               level: 0,
//               area: 1
//             }
//           }
//         },
//         tileMap: twoMap,
//         portals: {},
//         startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
//           x: 16,
//           y: 16
//         }
//       },
//       5: {
//         entitiesToPlace: [
//           {
//             type: CHARACTERS.FAM_NPC,
//             name: 'NPC_1',
//             pos: {
//               col: 5,
//               row: 4
//             }
//           }
//         ],
//         spawnableEnemies: [
//           {
//             chance: 0.005,
//             enemy: CHARACTERS.SENTRY
//           }
//         ],
//         triggers: {
//           levelStart: [],
//           actOnEntity: {
//             NPC_1: [
//               {
//                 oneOff: true,
//                 type: 'dialog',
//                 lines: [
//                   {
//                     text: 'Hey Jenny!, I\'m so glad to see you!\n',
//                     speaker: 1
//                   },
//                   {
//                     text: 'Is everything okay?\nI had a very bad feeling this morning',
//                     speaker: 0
//                   },
//                   {
//                     text: 'I was taking a walk this morning in the valley,\nI was attacked by a horrible creature!',
//                     speaker: 1
//                   },
//                   {
//                     text: 'Please, take this sword!\nYou\'ll need it if you want to get to the town',
//                     speaker: 1
//                   }
//                 ]
//               }
//             ]
//           },
//           move: {}
//         },
//         tileMap: twoMap,
//         portals: {},
//         startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
//           x: 16,
//           y: 16
//         }
//       }
//     }
//   },
//   1: {
//     areas: {
//       0: {}
//     }
//   }
// };

export default levelConfig;