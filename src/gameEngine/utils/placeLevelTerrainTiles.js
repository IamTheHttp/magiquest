import Tile from 'entities/Tile';
import IndexedTile from 'classes/IndexedTile';

function placeLevelTerrainTiles(tileMap, viewSize, spawnableEnemies) {
  let {mapHeight, mapWidth} = viewSize;

  /**
   *
   * @type {Object.<string, IndexedTile>}
   */
  let idx = {};

  for (let rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
    let row = tileMap[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      let numOfCols = row.length;
      let numOfRows = tileMap.length;

      let tileWidth = mapWidth / numOfCols;
      let tileHeight = mapHeight / numOfRows; // num of cols

      let tile = new Tile({
        x: colIdx * tileWidth,
        y: rowIdx * tileHeight,
        width: tileWidth,
        height: tileHeight,
        tileType: tileMap[rowIdx][colIdx],
        spawnableEnemies
      });

      let tileIndex = `${rowIdx}-${colIdx}`;
      idx[tileIndex] = new IndexedTile(tile, tileIndex);

      Object.defineProperty(idx[tileIndex], 'entities', {
        writable: false
      });
    }
  }
  return idx;
}

export default placeLevelTerrainTiles;