import {IEntityMap} from 'game-platform/dist/lib/interfaces';
import {BaseEntity} from '../BaseEntity';
import Tile from '../entities/Tile';
import {BLOCKING, TRAVERSABLE} from '../components/_ComponentNames';
import Traversable from '../components/Traversable';

/**
 * An indexedTile is a wrapper around the Tile Entity.
 * The indexedTile is NOT an entity, but provides additional methods and properties that don't belong on an Entity
 */
class IndexedTile {
  idx: string;
  entities: IEntityMap<BaseEntity>;
  tile: Tile;
  entityCount: number;

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
      // If the entity we add is blocking, the tile is now NOT traversable
      if (ent.hasComponents(BLOCKING)) {
        this.tile.removeComponent(TRAVERSABLE);
      }
    }
  }

  removeEnt(ent: BaseEntity) {
    if (this.entities[ent.id]) {
      // Update the entityCount
      this.entityCount = Math.max(this.entityCount - 1, 0);

      // If the entity we removed is blocking, the tile is now traversable
      if (ent.hasComponents(BLOCKING)) {
        this.tile.addComponent(new Traversable());
      }
      delete this.entities[ent.id];
    }
  }

  isTraversable(entity: BaseEntity) {
    // If we're already in this tile, we can continue
    if (this.entities[entity.id]) {
      return true;
    }

    // If we're not on this tile, just return the tile current state
    if (!this.entities[entity.id]) {
      return this.tile.hasComponents(TRAVERSABLE);
    }
  }

  getEntCount() {
    return this.entityCount;
  }
}

export default IndexedTile;
