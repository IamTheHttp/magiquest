import {ILevelArea, PossibleTriggersArray} from "../../interfaces/levels.i";
import IParsedLevelCSVRow from "../../interfaces/IParsedLevelCSVRow";
import levelsJSON from "../../data/levels.json";
import {IPortalTrigger} from "../../interfaces/triggers.i";

/**
 * This function takes the static levels.json and merges it with real code from the level
 * @param level
 */
function mergeStaticLevelAreaData(level: ILevelArea): ILevelArea {
  const areaLevelRowData: IParsedLevelCSVRow = levelsJSON.find((levelRow: IParsedLevelCSVRow) => {
    return levelRow.id && levelRow.id === level.levelAreaID;
  });

  level.levelAreaID = areaLevelRowData.id;
  level.startPos = { // if not specified otherwise, this is where we start (useful for for new levels)
    col: areaLevelRowData.player_start_pos.col,
    row: areaLevelRowData.player_start_pos.row,
  };

  level.noSpawnLocations = areaLevelRowData.no_spawn_locations;

  level.spawnableEnemies = areaLevelRowData.monster_spawns;
  level.monsterDensity = areaLevelRowData.mon_per_tile;

  Object.keys(areaLevelRowData.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      level: areaLevelRowData.exits[tileCoordinate].level,
      area: areaLevelRowData.exits[tileCoordinate].area,
      exitTile: areaLevelRowData.exits[tileCoordinate].exitTile
    } as IPortalTrigger;

    if (!level.triggers.move[tileCoordinate]) {
      level.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    level.triggers.move[tileCoordinate].push(trigger);
  });

  return level;
}

export default mergeStaticLevelAreaData;