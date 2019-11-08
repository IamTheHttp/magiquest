import tileMap from 'levels/data/0-2_valley';

export default {
  tileMap,
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '13-14': {
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 3
      }
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    x: 48,
    y: 80
  }
};