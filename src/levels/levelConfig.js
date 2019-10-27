import oneMap from 'levels/data/test_15x15';
import twoMap from 'levels/data/test_50x32';
import {CHARACTERS} from 'gameConstants';
import {bit} from 'config';

let levelConfig = {
  0: {
    areas: {
      0: {
        tileMap: oneMap,
        portals: {
          '10-10': { // tile on index 1-1 Y/X index
            target: {
              level: 1,
              area: 0
            }
          }
        },
        enemies: [
          {
            type: CHARACTERS.SENTRY,
            pos: {
              x: 48 * 5,
              y: 48 * 5
            }
          }
        ],
        startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
          x: 16,
          y: 16
        }
      }
    }
  },
  1: {
    portals: [],
    areas: {
      0: {
        enemies: [{
          type: CHARACTERS.SENTRY,
          pos: {
            x: bit * 3 - 16,
            y: bit * 3 - 16
          }
        }],
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