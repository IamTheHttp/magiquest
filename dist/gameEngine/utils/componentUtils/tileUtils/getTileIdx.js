import { bit } from '../../../config';
function getTileIdxByPos(x, y) {
    var col = Math.floor(x / bit);
    var row = Math.floor(y / bit);
    return col + "-" + row;
}
function getTileIdxByEnt(ent) {
    var _a = ent.getPos(), x = _a.x, y = _a.y;
    return getTileIdxByPos(x, y);
}
export { getTileIdxByEnt, getTileIdxByPos };
