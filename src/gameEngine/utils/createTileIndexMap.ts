import Tile from 'gameEngine/entities/Tile';
import IndexedTile from 'gameEngine/classes/IndexedTile';
import {ISpawnableEnemies, ITileIndexMap, IViewSize} from '../../interfaces/interfaces';
import {ILevelArea, ILevelLocation, ITileMap} from "../../interfaces/levels.i";
import {AllowedLevelLocationIDs} from "gameConstants";


function createTileIndexMap(levelArea: ILevelArea, viewSize: IViewSize): ITileIndexMap {
  let {mapHeight, mapWidth} = viewSize;

  let tileMap = levelArea.tileMap;
  let locations = levelArea.locations;




  // take levelArea
  // If tile is in SAFE area, remove all "spawnable" from it.


  let idx = {} as ITileIndexMap;
  for (let rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
    let row = tileMap[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      let numOfCols = row.length;
      let numOfRows = tileMap.length;
      let tileIdx = `${colIdx},${rowIdx}`; // TODO move to util to abstract the comma

      let tileWidth = mapWidth / numOfCols;
      let tileHeight = mapHeight / numOfRows; // num of cols


      let spawnableEnemies: ISpawnableEnemies = [];
      let tileLocationID: AllowedLevelLocationIDs = null;
      let tileCharacterLevel:number = 1;
      let locationsFoundForTile = 0;
      locations.forEach((levelLocation: ILevelLocation) => {
        let colStart = levelLocation.start.col;
        let rowStart = levelLocation.start.row;
        let colEnd = levelLocation.end.col;
        let rowEnd = levelLocation.end.row;

        let inColRange = colIdx >= colStart && colIdx <= colEnd;
        let inRowRange = rowIdx >= rowStart && rowIdx <= rowEnd;

        if (inColRange && inRowRange) {
          spawnableEnemies = levelLocation.spawnableEnemies || [];
          tileLocationID = levelLocation.id;
          tileCharacterLevel = levelLocation.locationCharacterLevel;
          // if spawnable, it MUST have a levelLocationID
          if (tileLocationID === null || tileCharacterLevel <= 0) {
            throw `Invalid tileLocationID or tileCharacterLevel provided in location ${{tileLocationID, tileCharacterLevel}}`
          } else {
            locationsFoundForTile++;
          }
        }
      });

      if (locationsFoundForTile > 1) {
        throw 'A LevelLocation cannot overlap over a tile';
      }

      let tile = new Tile({
        x: colIdx * tileWidth,
        y: rowIdx * tileHeight,
        tileIdx,
        width: tileWidth,
        height: tileHeight,
        tileType: tileMap[rowIdx][colIdx],
        spawnableEnemies,
        tileLocationID,
        tileCharacterLevel
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