import { bit } from 'gameEngine/config';
function getCenterPosOfGridIdx(col, row) {
    return {
        x: col * bit + (bit / 2),
        y: row * bit + (bit / 2)
    };
}
function getGridIdxFromPos(x, y) {
    var col = Math.floor(x / bit);
    var row = Math.floor(y / bit);
    return { col: col, row: row };
}
export { getCenterPosOfGridIdx, getGridIdxFromPos };
