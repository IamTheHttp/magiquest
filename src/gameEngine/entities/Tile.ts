import {CANVAS_OUTPUT, PossibleUIShapes, AllowedZoneLocationIDs, WALKABLE_TILE_TYPES} from '../gameConstants';
import PositionComponent from '../components/PositionComponent';
import BackgroundComponent from '../components/BackgroundComponent';
import TraversableComponent from '../components/TraversableComponent';
import {BaseEntity} from '../BaseEntity';
import CanSpawn from 'gameEngine/components/CanSpawn';
import {BACKGROUND_COMP, TRAVERSABLE_COMP} from '../components/_ComponentNamesConfig';

interface ITileConstructor {
  x: number;
  y: number;
  tileIdx: string;
  height: number;
  width: number;
  tileType: number;
  tileLocationID: AllowedZoneLocationIDs;
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
    this.addComponent(new PositionComponent({x, y, height, width}));

    // 1 is grass, 7 is road
    // REFACTOR - Seems strange here.. (if type === 1?)
    if (WALKABLE_TILE_TYPES.includes(tileType)) {
      this.addComponent(new TraversableComponent());
      this.addComponent(new CanSpawn(tileLocationID, tileEntityLevel));
    }

    this.addComponent(
      new BackgroundComponent([
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
      this.addComponent(new TraversableComponent());
    } else {
      this.removeComponent(TRAVERSABLE_COMP);
    }

    this.removeComponent(BACKGROUND_COMP);
    this.addComponent(
      new BackgroundComponent([
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
