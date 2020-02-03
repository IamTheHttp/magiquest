var count = Symbol('Count');
var IndexedTile = /** @class */ (function () {
    /**
     * @param {Tile} tile
     */
    function IndexedTile(tile, idx) {
        var _a;
        /**
         * @type {Object.<number, BaseEntity>}
         */
        this.idx = idx;
        this.entities = (_a = {},
            _a[count] = 0,
            _a);
        /**
         * @type {Tile}
         */
        this.tile = tile;
    }
    IndexedTile.prototype.addEnt = function (ent) {
        if (!this.entities[ent.id]) {
            this.entities[count]++;
            this.entities[ent.id] = ent;
        }
    };
    IndexedTile.prototype.removeEnt = function (ent) {
        if (this.entities[ent.id]) {
            this.entities[count] = Math.max(this.entities[count] - 1, 0);
            delete this.entities[ent.id];
        }
    };
    IndexedTile.prototype.getEntCount = function () {
        return this.entities[count];
    };
    return IndexedTile;
}());
export default IndexedTile;
