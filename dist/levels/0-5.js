import tileMap from 'levels/data/0-5_TMP.json';
export default {
    tileMap: tileMap,
    triggers: {
        levelStart: [],
        actOnEntity: {},
        move: {
            '13-14': {
                oneOff: true,
                type: 'portal',
                level: 1,
                area: 0
            }
        }
    },
    entitiesToPlace: [],
    startPos: {
        col: 0,
        row: 0
    }
};
