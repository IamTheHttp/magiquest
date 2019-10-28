import oneMap from 'levels/data/0-0_home';
import twoMap from 'levels/data/0-1_adventure';
import {CHARACTERS} from 'gameConstants';
import {bit} from 'config';

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
        entitiesToPlace: [

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