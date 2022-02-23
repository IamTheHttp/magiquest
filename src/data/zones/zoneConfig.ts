import {IZone} from '../../interfaces/IZones';
import hasValue from '../../gameEngine/utils/hasValue';
import MAP_0_0 from '../json/maps/0-0.map.json';
import MAP_0_1 from '../json/maps/0-1.map.json';
import {createZone} from './utils/createZone';

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

// TOOD create a live object based on these levels
function populateZoneConfig() {
  populateGlobalZoneConfig(createZone({id: '0-0', tileMap: MAP_0_0}));
  populateGlobalZoneConfig(createZone({id: '0-1', tileMap: MAP_0_1}));
}

populateZoneConfig();

export {zoneConfig};
