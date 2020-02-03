import tileMap from 'levels/data/0-3_town.json';

export default {
  tileMap,
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
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 3,
    row: 7
  }
};