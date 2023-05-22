import {IIndexedTileMap, IViewSize} from '../../interfaces/IGeneral';
import {IZone, IZoneLocation} from '../../interfaces/IZones';
import {SPAWNER} from '../components/_ComponentNames';
import {I_ALLOWED_ZONE_LOCATION_IDS} from '../gameConstants';
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

function createTileIndexMap(zone: IZone, viewSize: IViewSize): IIndexedTileMap {
  const {mapHeight, mapWidth} = viewSize;

  const tileMap = zone.tileMap;
  const locations = zone.locations;

  // take levelArea
  // If tile is in SAFE area, remove all "spawnable" from it.

  const idx = {} as IIndexedTileMap;

  for (let rowNumber = 0; rowNumber < tileMap.length; rowNumber++) {
    const row = tileMap[rowNumber];

    for (let colNumber = 0; colNumber < row.length; colNumber++) {
      const numOfCols = row.length;
      const numOfRows = tileMap.length;
      const tileIdx = `${colNumber},${rowNumber}`; // TODO move to util to abstract the comma

      const tileWidth = mapWidth / numOfCols;
      const tileHeight = mapHeight / numOfRows;

      let tileLocationID: I_ALLOWED_ZONE_LOCATION_IDS = null;
      let tileEntityLevel = 1;
      let locationsFoundForTile = 0;
      locations.forEach((levelLocation: IZoneLocation) => {
        const colStart = levelLocation.start.col;
        const rowStart = levelLocation.start.row;
        const colEnd = levelLocation.end.col;
        const rowEnd = levelLocation.end.row;

        const inColRange = inRange(colStart, colNumber, colEnd);
        const inRowRange = inRange(rowStart, rowNumber, rowEnd);

        if (inColRange && inRowRange) {
          tileLocationID = levelLocation.id;
          tileEntityLevel = levelLocation.locationEntityLevel;
          // if spawnable, it MUST have a levelLocationID
          if (tileLocationID === null || tileEntityLevel <= 0) {
            throw `Invalid tileLocationID or tileEntityLevel provided in location ${{
              tileLocationID,
              tileEntityLevel
            }}`;
          } else {
            locationsFoundForTile++;
          }
        }
      });

      if (locationsFoundForTile > 1) {
        throw 'A LevelLocation cannot overlap over a tile';
      }

      const tile = new Tile({
        x: colNumber * tileWidth,
        y: rowNumber * tileHeight,
        tileIdx,
        width: tileWidth,
        height: tileHeight,
        tileType: tileMap[rowNumber][colNumber],
        tileLocationID,
        tileEntityLevel
      });

      // Is the tile location within a safe spot?

      zone.noSpawnLocations.forEach((safeLocation) => {
        const withinX = inRange(safeLocation.start.col, colNumber, safeLocation.end.col);
        const withinY = inRange(safeLocation.start.row, rowNumber, safeLocation.end.row);

        if (withinX && withinY) {
          tile.removeComponent(SPAWNER);
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
