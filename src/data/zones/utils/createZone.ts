import {ITileMap, IZone, PossibleTriggersArray} from '../../../interfaces/IZones';
import IZoneData from '../../../interfaces/IZoneData';
import zonesJSON from '../../json/zones.json';
import {IPortalTrigger} from '../../../interfaces/ITriggers';
import {validateZone} from './validateZone';

/**
 * This function creates a Zone object
 * It accepts an id and a tile map and returns ths JSON data of the level, merged with those properties
 * @param zone
 */
function createZone(zone: {id: string; tileMap: ITileMap}): IZone {
  const zoneJSONData: IZoneData = zonesJSON.find((zoneRow: IZoneData) => {
    return zoneRow.id === zone.id;
  });

  if (!zoneJSONData) {
    console.error(`Could not find a zone in the zone config for the map ${zone.id}`);
    return;
  }

  let NEW_ZONE = Object.assign<Partial<IZone>, IZoneData>(zone, zoneJSONData) as IZone;

  NEW_ZONE.tileMap = zone.tileMap;

  // Dynamically add portal triggers based on the exits in the JSON
  Object.keys(zoneJSONData.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      act: zoneJSONData.exits[tileCoordinate].act,
      chapter: zoneJSONData.exits[tileCoordinate].chapter,
      exitTile: zoneJSONData.exits[tileCoordinate].exitTile
    } as IPortalTrigger;

    // If the move triggers is not yet set as an array, create it
    if (!NEW_ZONE.triggers.move[tileCoordinate]) {
      // Set move triggers for this tile as an array
      NEW_ZONE.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    // Add another move trigger to this tile
    NEW_ZONE.triggers.move[tileCoordinate].push(trigger);
  });

  validateZone(NEW_ZONE);
  return NEW_ZONE;
}

export {createZone};
