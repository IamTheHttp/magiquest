import {IZone, PossibleTriggersArray} from "../../interfaces/levels.i";
import IParsedLevelCSVRow from "../../interfaces/IParsedLevelCSVRow";
import levelsJSON from "../../data/levels.json";
import {IPortalTrigger} from "../../interfaces/triggers.i";

/**
 * This function takes the static levels.json and merges it with real code from the level
 * @param zone
 */
function mergeStaticLevelAreaData(zone: IZone): IZone {
  const areaLevelRowData: IParsedLevelCSVRow = levelsJSON.find((levelRow: IParsedLevelCSVRow) => {
    return levelRow.id && levelRow.id === zone.zoneID;
  });

  zone.zoneID = areaLevelRowData.id;
  zone.startPos = { // if not specified otherwise, this is where we start (useful for for new levels)
    col: areaLevelRowData.player_start_pos.col,
    row: areaLevelRowData.player_start_pos.row,
  };

  zone.noSpawnLocations = areaLevelRowData.no_spawn_locations;

  zone.spawnableEnemies = areaLevelRowData.monster_spawns;
  zone.monsterDensity = areaLevelRowData.mon_per_tile;

  Object.keys(areaLevelRowData.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      level: areaLevelRowData.exits[tileCoordinate].level,
      area: areaLevelRowData.exits[tileCoordinate].area,
      exitTile: areaLevelRowData.exits[tileCoordinate].exitTile
    } as IPortalTrigger;

    if (!zone.triggers.move[tileCoordinate]) {
      zone.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    zone.triggers.move[tileCoordinate].push(trigger);
  });

  return zone;
}

export default mergeStaticLevelAreaData;