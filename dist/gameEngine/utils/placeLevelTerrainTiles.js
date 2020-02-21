import Tile from 'gameEngine/entities/Tile';
import IndexedTile from 'gameEngine/classes/IndexedTile';
function placeLevelTerrainTiles(tileMap, viewSize, spawnableEnemies) {
    var mapHeight = viewSize.mapHeight, mapWidth = viewSize.mapWidth;
    /**
     *
     * @type {Object.<string, IndexedTile>}
     */
    var idx = {};
    for (var rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
        var row = tileMap[rowIdx];
        for (var colIdx = 0; colIdx < row.length; colIdx++) {
            var numOfCols = row.length;
            var numOfRows = tileMap.length;
            var tileIdx = colIdx + "-" + rowIdx;
            var tileWidth = mapWidth / numOfCols;
            var tileHeight = mapHeight / numOfRows; // num of cols
            var tile = new Tile({
                x: colIdx * tileWidth,
                y: rowIdx * tileHeight,
                tileIdx: tileIdx,
                width: tileWidth,
                height: tileHeight,
                tileType: tileMap[rowIdx][colIdx],
                spawnableEnemies: spawnableEnemies
            });
            idx[tileIdx] = new IndexedTile(tile, tileIdx);
            Object.defineProperty(idx[tileIdx], 'gameEngine/entities', {
                writable: false
            });
        }
    }
    return idx;
}
export default placeLevelTerrainTiles;
