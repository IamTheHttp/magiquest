import map from './0-1.map.json';
import {ILevelArea} from "../../interfaces/levels.i";
import mergeStaticLevelAreaData from "../utils/mergeStaticLevelAreaData";

let level: ILevelArea = {
  levelAreaID: '0-1',
  noSpawnLocations:[], // Filled by static csv data
  monsterDensity:0, // Filled by static csv data
  spawnableEnemies:[], // Filled by static csv data
  startPos: null, // Filled by static csv data
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
  entitiesToPlace: []
};

export const ZERO_ONE = mergeStaticLevelAreaData(level);