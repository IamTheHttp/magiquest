import {ITileIndexMap, IViewSize} from '../../interfaces/IGeneral';
import {IZone, IZoneLocation} from '../../interfaces/IZones';
import {CAN_SPAWN_COMP} from '../components/ComponentNamesConfig';
import {AllowedZoneLocationIDs} from '../gameConstants';
import Tile from '../entities/Tile';
import IndexedTile from '../classes/IndexedTile';

/**
 *
 * @param a
 * @param x
 * @param b
 * @param inclusive
 * A function that checks of a number is between two other numbers
 */
function inRange(a: number, x: number, b: number, inclusive = true) {
  if (inclusive) {
    return x >= a && x <= b;
  } else {
    return x > a && x < b;
  }
}

function createTileIndexMap(zone: IZone, viewSize: IViewSize): ITileIndexMap {
  let {mapHeight, mapWidth} = viewSize;

  let tileMap = zone.tileMap;
  let locations = zone.locations;

  // take levelArea
  // If tile is in SAFE area, remove all "spawnable" from it.

  let idx = {} as ITileIndexMap;

  for (let rowNumber = 0; rowNumber < tileMap.length; rowNumber++) {
    let row = tileMap[rowNumber];

    for (let colNumber = 0; colNumber < row.length; colNumber++) {
      let numOfCols = row.length;
      let numOfRows = tileMap.length;
      let tileIdx = `${colNumber},${rowNumber}`; // TODO move to util to abstract the comma

      let tileWidth = mapWidth / numOfCols;
      let tileHeight = mapHeight / numOfRows;

      let tileLocationID: AllowedZoneLocationIDs = null;
      let tileCharacterLevel: number = 1;
      let locationsFoundForTile = 0;
      locations.forEach((levelLocation: IZoneLocation) => {
        let colStart = levelLocation.start.col;
        let rowStart = levelLocation.start.row;
        let colEnd = levelLocation.end.col;
        let rowEnd = levelLocation.end.row;

        let inColRange = inRange(colStart, colNumber, colEnd);
        let inRowRange = inRange(rowStart, rowNumber, rowEnd);

        if (inColRange && inRowRange) {
          tileLocationID = levelLocation.id;
          tileCharacterLevel = levelLocation.locationCharacterLevel;
          // if spawnable, it MUST have a levelLocationID
          if (tileLocationID === null || tileCharacterLevel <= 0) {
            throw `Invalid tileLocationID or tileCharacterLevel provided in location ${{
              tileLocationID,
              tileCharacterLevel
            }}`;
          } else {
            locationsFoundForTile++;
          }
        }
      });

      if (locationsFoundForTile > 1) {
        throw 'A LevelLocation cannot overlap over a tile';
      }

      let tile = new Tile({
        x: colNumber * tileWidth,
        y: rowNumber * tileHeight,
        tileIdx,
        width: tileWidth,
        height: tileHeight,
        tileType: tileMap[rowNumber][colNumber],
        tileLocationID,
        tileCharacterLevel
      });

      // Is the tile location within a safe spot?

      zone.noSpawnLocations.forEach((safeLocation) => {
        let withinX = inRange(safeLocation.start.col, colNumber, safeLocation.end.col);
        let withinY = inRange(safeLocation.start.row, rowNumber, safeLocation.end.row);

        if (withinX && withinY) {
          tile.removeComponent(CAN_SPAWN_COMP);
        }
      });

      idx[tileIdx] = new IndexedTile(tile, tileIdx);

      Object.defineProperty(idx[tileIdx], 'gameEngine/entities', {
        writable: false
      });
    }
  }

  return idx;
}

export default createTileIndexMap;
