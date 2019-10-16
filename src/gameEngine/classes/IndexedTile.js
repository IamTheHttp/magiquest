class IndexedTile {
  /**
   * @param {Tile} tile
   */
  constructor(tile) {
    /**
     * @type {Object.<number, BaseEntity>}
     */
    this.entities = {
      ['[[COUNT]]']: 0
    };
    
    /**
     * @type {Tile}
     */
    this.tile = tile;
  }
  addEnt(ent) {
    if (!this.entities[ent.id]) {
      this.entities['[[COUNT]]']++;
      this.entities[ent.id] = ent;
    }
  }
  removeEnt(ent) {
    if (this.entities[ent.id]) {
      this.entities['[[COUNT]]'] = Math.max(this.entities['[[COUNT]]'] - 1, 0);
      delete this.entities[ent.id];
    }
  }
  getEntCount() {
    return this.entities['[[COUNT]]'];
  }
}


export default IndexedTile;