import oneMap from 'levels/data/0-0_home';

export default {
  tileMap: oneMap,
  triggers: {
    levelStart: [{
      oneOff: true,
      type: 'dialog',
      lines: [
        {
          text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
          speaker: 0
        }
      ]
    }],
    actOnEntity: {},
    move: {
      '13-14': {
        oneOff: true,
        type: 'portal',
        level: 0,
        area: 1
      }
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    x: 48,
    y: 80
  }
};