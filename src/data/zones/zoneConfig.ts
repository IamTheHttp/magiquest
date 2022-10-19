import {IZone} from '../../interfaces/IZones';
import {createZone} from './utils/createZone';

// @ts-ignore
function requireAll(r: any) {
  return r.keys().map(r);
}

// @ts-ignore
// Get all maps.json files
const maps = requireAll(require.context('../json/maps/', true, /\.json$/));

import IZoneData from '../../interfaces/IZoneData';
import zonesJSON from '../json/zones.json';

// TODO this should be some interface
let zoneConfig = {} as {
  [numAct: number]: {
    chapters: {
      [numChapter: number]: IZone;
    };
  };
};

function populateGlobalZoneConfig(zone: IZone) {
  let numAct = +zone.act;
  let numChapter = +zone.chapter;

  zoneConfig[numAct] = zoneConfig[numAct] || {chapters: {}};
  zoneConfig[numAct].chapters[numChapter] = zone;
}

function populateZoneConfig() {
  for (let file in maps) {
    const mapFile = maps[file];
    const {act, chapter, tileMap} = mapFile;

    const ZONE_ID = `${act}-${chapter}`;

    const zoneJSONData: IZoneData = zonesJSON.find((zoneRow: IZoneData) => {
      return zoneRow.id === ZONE_ID;
    });

    populateGlobalZoneConfig(createZone({id: ZONE_ID, tileMap: tileMap}, zoneJSONData));
  }
}

populateZoneConfig();

export {zoneConfig, createZone, populateGlobalZoneConfig};
