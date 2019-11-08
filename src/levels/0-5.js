import tileMap from 'levels/data/0-5_TMP';

export default {
  tileMap,
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
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 0,
    row: 0
  }
};