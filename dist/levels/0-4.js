import tileMap from 'levels/data/0-4_TMP.json';
export default {
    tileMap: tileMap,
    triggers: {
        levelStart: [],
        actOnEntity: {},
        move: {
            '13-14': {
                oneOff: true,
                type: 'portal',
                level: 0,
                area: 5
            }
        }
    },
    entitiesToPlace: [],
    startPos: {
        col: 0,
        row: 0
    }
};
