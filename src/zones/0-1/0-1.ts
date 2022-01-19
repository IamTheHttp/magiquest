import map from './0-1.map.json';
import {IZone} from "../../interfaces/zones.i";
import {mergeStaticZoneData} from "../utils/mergeStaticZoneData";


let zone: IZone = {
  zoneID: '0-1',
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

export const ZERO_ONE = mergeStaticZoneData(zone);