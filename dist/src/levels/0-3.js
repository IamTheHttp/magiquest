import tileMap from 'levels/data/0-3_town.json';
export default {
    tileMap: tileMap,
    triggers: {
        levelStart: [],
        actOnEntity: {},
        move: {
            '29-4': {
                oneOff: true,
                type: 'portal',
                level: 0,
                area: 4
            }
        }
    },
    entitiesToPlace: [],
    startPos: {
        col: 3,
        row: 7
    }
};
