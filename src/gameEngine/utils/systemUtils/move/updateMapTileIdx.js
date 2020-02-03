"use strict";
exports.__esModule = true;
var getTileIdx_1 = require("../../componentUtils/tileUtils/getTileIdx");
function updateMapTileIdx(_a) {
    var entity = _a.entity, tileIdxMap = _a.tileIdxMap, _b = _a.oldX, oldX = _b === void 0 ? null : _b, _c = _a.oldY, oldY = _c === void 0 ? null : _c, _d = _a.newX, newX = _d === void 0 ? null : _d, _e = _a.newY, newY = _e === void 0 ? null : _e;
    /**
     * @type IndexedTile
     */
    var oldIndexedTile = tileIdxMap[getTileIdx_1.getTileIdxByPos(oldX, oldY)];
    var newIndexedTile = tileIdxMap[getTileIdx_1.getTileIdxByPos(newX, newY)];
    oldIndexedTile && oldIndexedTile.removeEnt(entity);
    newIndexedTile && newIndexedTile.addEnt(entity);
}
exports["default"] = updateMapTileIdx;
