import {ILevelArea, PossibleTriggersArray} from "../../interfaces/levels.i";
import ILevelCSVRow from "../../interfaces/levelsCSVRow.i";
import levelsJSON from "../levels.json";
import {IPortalTrigger} from "../../interfaces/triggers.i";

function mergeStaticLevelAreaData(level: ILevelArea): ILevelArea {
  const areaLevelRowData: ILevelCSVRow = levelsJSON.find((levelRow: ILevelCSVRow) => {
    return levelRow.id && levelRow.id === level.levelAreaID;
  });

  level.levelAreaID = areaLevelRowData.id;
  level.startPos = { // if not specified otherwise, this is where we start (useful for for new levels)
    col: areaLevelRowData.player_start_pos.x,
    row: areaLevelRowData.player_start_pos.y,
  };

  Object.keys(areaLevelRowData.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      level: areaLevelRowData.exits[tileCoordinate].level,
      area: areaLevelRowData.exits[tileCoordinate].area
    } as IPortalTrigger;

    if (!level.triggers.move[tileCoordinate]) {
      level.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    level.triggers.move[tileCoordinate].push(trigger);
  });

  return level;
}

export default mergeStaticLevelAreaData;