let count = Symbol('Count');

class IndexedTile {
  /**
   * @param {Tile} tile
   */
  constructor(tile, idx) {
    /**
     * @type {Object.<number, BaseEntity>}
     */
    this.idx = idx;
    this.entities = {
      [count]: 0
    };
    
    /**
     * @type {Tile}
     */
    this.tile = tile;
  }
  addEnt(ent) {
    if (!this.entities[ent.id]) {
      this.entities[count]++;
      this.entities[ent.id] = ent;
    }
  }

  removeEnt(ent) {
    if (this.entities[ent.id]) {
      this.entities[count] = Math.max(this.entities[count] - 1, 0);
      delete this.entities[ent.id];
    }
  }
  getEntCount() {
    return this.entities[count];
  }
}


export default IndexedTile;