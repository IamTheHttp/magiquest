import Tile from 'gameEngine/entities/Tile';
import IndexedTile from 'gameEngine/classes/IndexedTile';
import {ITileIndexMap} from '../../interfaces';



function createTileIndexMap(tileMap, viewSize, spawnableEnemies): ITileIndexMap {
  let {mapHeight, mapWidth} = viewSize;

  /**
   *
   * @type {Object.<string, IndexedTile>}
   */
  let idx = {} as ITileIndexMap;
  for (let rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
    let row = tileMap[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      let numOfCols = row.length;
      let numOfRows = tileMap.length;
      let tileIdx = `${colIdx}-${rowIdx}`;

      let tileWidth = mapWidth / numOfCols;
      let tileHeight = mapHeight / numOfRows; // num of cols

      let tile = new Tile({
        x: colIdx * tileWidth,
        y: rowIdx * tileHeight,
        tileIdx,
        width: tileWidth,
        height: tileHeight,
        tileType: tileMap[rowIdx][colIdx],
        spawnableEnemies
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