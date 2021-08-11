import {IEntityMap} from "game-platform/dist/lib/interfaces";
import {BaseEntity} from "../BaseEntity";
import Tile from "../entities/Tile";

/**
 * An indexedTile is a wrapper around the Tile Entity.
 * The indexedTile is NOT an entity, but provides additional methods and properties that don't belong on an Entity
 */
class IndexedTile {
  idx: string;
  entities: IEntityMap<BaseEntity>;
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