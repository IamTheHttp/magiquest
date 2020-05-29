import map from './0-1.map.json';
import {ILevelArea} from "../../interfaces/levels.i";
import mergeStaticLevelAreaData from "../utils/mergeStaticLevelAreaData";

let level: ILevelArea = {
  levelAreaID: '0-1',
  locations: [],
  tileMap: map,
  triggers: {
    levelStart: [],
    actOnEntity: {},
    move: {
      '-1,-2': [{
        oneOff: true,
        type: 'dialog',
        lines: [
          {
            text: 'I should collect my sword\n(hit space to open chests)',
            speaker: 0
          }
        ]
      }]
    }
  },
  entitiesToPlace: [],
  startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
    col: 5,
    row: 95
  }
};

export default mergeStaticLevelAreaData(level);