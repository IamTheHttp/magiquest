import Tile from "entities/Tile";
import BaseEntity from "BaseEntity";
import {IEntityMap} from "game-platform/types/lib/interfaces";

class IndexedTile {
  idx: string;
  entities: IEntityMap;
  tile: Tile;
  entityCount:number;

  constructor(tile: Tile, idx: string) {
    this.idx = idx;
    this.entities = {};
    this.entityCount = 0;

    /**
     * @type {Tile}
     */
    this.tile = tile;
  }
  addEnt(ent: BaseEntity) {
    if (!this.entities[ent.id]) {
      this.entityCount++;
      this.entities[ent.id] = ent;
    }
  }

  removeEnt(ent: BaseEntity) {
    if (this.entities[ent.id]) {
      this.entityCount = Math.max(this.entityCount - 1, 0);
      delete this.entities[ent.id];
    }
  }
  getEntCount() {
    return this.entityCount;
  }
}


export default IndexedTile;