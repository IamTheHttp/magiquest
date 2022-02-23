import {IZone, PossibleTriggersArray} from '../../../interfaces/IZones';
import IZoneData from '../../../interfaces/IZoneData';
import levelsJSON from '../../json/zones.json';
import {IPortalTrigger} from '../../../interfaces/ITriggers';

/**
 * This function takes the static levels.json and merges it with real code from the level
 * @param zone
 */
function mergeStaticZoneData(zone: IZone): IZone {
  const zoneJSONData: IZoneData = levelsJSON.find((zoneRow: IZoneData) => {
    return zoneRow.id && zoneRow.id === zone.zoneID;
  });

  zone.zoneID = zoneJSONData.id;
  zone.startPos = {
    // if not specified otherwise, this is where we start (useful for for new levels)
    col: zoneJSONData.player_start_pos.col,
    row: zoneJSONData.player_start_pos.row
  };

  zone.noSpawnLocations = zoneJSONData.no_spawn_locations;

  zone.spawnableEnemies = zoneJSONData.monster_spawns;
  zone.monsterDensity = zoneJSONData.mon_per_tile;

  Object.keys(zoneJSONData.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      act: zoneJSONData.exits[tileCoordinate].act,
      chapter: zoneJSONData.exits[tileCoordinate].chapter,
      exitTile: zoneJSONData.exits[tileCoordinate].exitTile
    } as IPortalTrigger;

    // If the move triggers is not yet set as an array, create it
    if (!zone.triggers.move[tileCoordinate]) {
      // Set move triggers for this tile as an array
      zone.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    // Add another move trigger to this tile
    zone.triggers.move[tileCoordinate].push(trigger);
  });

  return zone;
}

export {mergeStaticZoneData};
