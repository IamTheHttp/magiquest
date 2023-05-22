import {CANVAS_OUTPUT, PossibleUIShapes, I_ALLOWED_ZONE_LOCATION_IDS, WALKABLE_TILE_TYPES} from '../gameConstants';
import Position from '../components/Position';
import Background from '../components/Background';
import Traversable from '../components/Traversable';
import {BaseEntity} from '../BaseEntity';
import Spawner from 'gameEngine/components/Spawner';
import {BACKGROUND, TRAVERSABLE} from '../components/_ComponentNames';

interface ITileConstructor {
  x: number;
  y: number;
  tileIdx: string;
  height: number;
  width: number;
  tileType: number;
  tileLocationID: I_ALLOWED_ZONE_LOCATION_IDS;
  tileEntityLevel: number;
}

/**
 * A tile is an Entity in the game.
 * The Tile is rendered to the background has different states such as "isTraversable"
 */
class Tile extends BaseEntity {
  tileIdx: string;
  constructor({x, y, tileIdx, height, width, tileType, tileLocationID, tileEntityLevel}: ITileConstructor) {
    super();
    this.tileIdx = tileIdx;
    this.addComponent(new Position({x, y, height, width}));

    // 1 is grass, 7 is road
    // REFACTOR - Seems strange here.. (if type === 1?)
    if (WALKABLE_TILE_TYPES.includes(tileType)) {
      this.addComponent(new Traversable());
      this.addComponent(new Spawner(tileLocationID, tileEntityLevel));
    }

    this.addComponent(
      new Background([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.MAP_TILE_SHAPE,
          data: {
            tileType
          }
        }
      ])
    );
  }

  // TODO for Editor mode only, allows change the tile type in the editor mode
  setTileType(tileType: number) {
    if (WALKABLE_TILE_TYPES.includes(tileType)) {
      this.addComponent(new Traversable());
    } else {
      this.removeComponent(TRAVERSABLE);
    }

    this.removeComponent(BACKGROUND);
    this.addComponent(
      new Background([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.MAP_TILE_SHAPE,
          data: {
            tileType
          }
        }
      ])
    );
  }
}

export default Tile;
