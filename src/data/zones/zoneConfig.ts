import {IZone} from '../../interfaces/IZones';
import {createZone} from './utils/createZone';
import * as maps from 'glob:../json/maps/*.map.json';

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
    populateGlobalZoneConfig(createZone({id: `${act}-${chapter}`, tileMap: tileMap}));
  }
}

populateZoneConfig();

export {zoneConfig};
