import {IZone} from '../../interfaces/IZones';
import {createZone} from './utils/createZone';
import {IZoneJSON} from '../jsonTypes/IZoneJSON';
import {IMapJSON} from '../jsonTypes/IMapJSON';

// @ts-ignore
function requireAll(r: any) {
  return r.keys().map(r);
}

let zoneConfig: {
  [numAct: number]: {
    chapters: {
      [numChapter: number]: IZone;
    };
  };
} = {};

// @ts-ignore
// Get all maps.json files
const maps: IMapJSON[] = requireAll(require.context('../json/maps/', true, /\.json$/));
// @ts-ignore
const zones: IZoneJSON[] = requireAll(require.context('../json/zones/', true, /\.json$/));

function populateGlobalZoneConfig(zone: IZone) {
  let numAct = +zone.act;
  let numChapter = +zone.chapter;

  zoneConfig[numAct] = zoneConfig[numAct] || {chapters: {}};
  zoneConfig[numAct].chapters[numChapter] = zone;
}

function populateZoneConfig() {
  for (let mapNumber in maps) {
    const mapFile = maps[mapNumber];
    const {act, chapter, tileMap} = mapFile;

    const ZONE_ID = `${act}-${chapter}`;

    const zoneJSON: IZoneJSON = zones.find((zoneRow: IZoneJSON) => {
      return zoneRow.id === ZONE_ID;
    });
    populateGlobalZoneConfig(createZone(ZONE_ID, tileMap, zoneJSON));
  }
}

populateZoneConfig();

export {zoneConfig, createZone, populateGlobalZoneConfig};
