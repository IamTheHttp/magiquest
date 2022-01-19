import {IZone, PossibleTriggersArray} from '../../interfaces/zones.i';
import IParsedLevelCSVRow from '../../interfaces/IParsedLevelCSVRow';
import levelsJSON from '../../data/levels.json';
import {IPortalTrigger} from '../../interfaces/triggers.i';

/**
 * This function takes the static levels.json and merges it with real code from the level
 * @param zone
 */
function mergeStaticZoneData(zone: IZone): IZone {
  const zoneCSVData: IParsedLevelCSVRow = levelsJSON.find((levelRow: IParsedLevelCSVRow) => {
    return levelRow.id && levelRow.id === zone.zoneID;
  });

  zone.zoneID = zoneCSVData.id;
  zone.startPos = {
    // if not specified otherwise, this is where we start (useful for for new levels)
    col: zoneCSVData.player_start_pos.col,
    row: zoneCSVData.player_start_pos.row
  };

  zone.noSpawnLocations = zoneCSVData.no_spawn_locations;

  zone.spawnableEnemies = zoneCSVData.monster_spawns;
  zone.monsterDensity = zoneCSVData.mon_per_tile;

  Object.keys(zoneCSVData.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      act: zoneCSVData.exits[tileCoordinate].level,
      chapter: zoneCSVData.exits[tileCoordinate].area,
      exitTile: zoneCSVData.exits[tileCoordinate].exitTile
    } as IPortalTrigger;

    if (!zone.triggers.move[tileCoordinate]) {
      zone.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    zone.triggers.move[tileCoordinate].push(trigger);
  });

  return zone;
}

export {mergeStaticZoneData};
