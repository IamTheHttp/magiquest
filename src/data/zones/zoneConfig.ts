import {IZone} from '../../interfaces/IZones';
import {createZone} from './utils/createZone';
import {IZoneJSON} from '../../interfaces/IZoneJSON';
import {getAllTileMapJSONFiles} from '../../utils/getAllTileMapJSONFiles';
import {getAllZoneJSONFiles} from '../../utils/getAllZoneJSONFiles';

let zoneConfig: {
  [numAct: number]: {
    chapters: {
      [numChapter: number]: IZone;
    };
  };
} = {};

// Get all maps.json files
const tileMapsJSON = getAllTileMapJSONFiles();
const zones = getAllZoneJSONFiles();

function populateGlobalZoneConfig(zone: IZone) {
  let numAct = +zone.act;
  let numChapter = +zone.chapter;

  zoneConfig[numAct] = zoneConfig[numAct] || {chapters: {}};
  zoneConfig[numAct].chapters[numChapter] = zone;
}

function populateZoneConfig() {
  for (let mapNumber in tileMapsJSON) {
    const mapFile = tileMapsJSON[mapNumber];
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
