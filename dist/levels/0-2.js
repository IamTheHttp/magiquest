import tileMap from 'levels/data/0-2_valley.json';
import { CHARACTERS } from 'gameEngine/gameConstants';
export default {
    tileMap: tileMap,
    spawnableEnemies: [
        {
            chance: 0.050,
            enemy: CHARACTERS.SENTRY
        }
    ],
    triggers: {
        levelStart: [],
        actOnEntity: {},
        move: {
            '21-0': {
                oneOff: true,
                type: 'portal',
                level: 0,
                area: 3
            }
        }
    },
    entitiesToPlace: [],
    startPos: {
        col: 0,
        row: 3
    }
};
