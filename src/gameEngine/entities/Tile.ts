import {CANVAS_OUTPUT, CHARACTERS, AllowedUIShapes, AllowedLevelLocationIDs} from '../gameConstants';
import PositionComponent from '../components/PositionComponent';
import BackgroundComponent from '../components/BackgroundComponent';
import TraversableComponent from '../components/TraversableComponent';
import {BaseEntity} from '../BaseEntity';
import CanSpawn from 'gameEngine/components/CanSpawn';
import {BACKGROUND_COMP, TRAVERSABLE_COMP} from "../components/ComponentNamesConfig";


interface ITileConstructor {
  x: number;
  y: number;
  tileIdx: string;
  height: number;
  width: number;
  tileType: number;
  tileLocationID: AllowedLevelLocationIDs;
  tileCharacterLevel: number;
}


/**
 * A tile is an Entity in the game.
 * The Tile is rendered to the background has different states such as "isTraversable"
 */
class Tile extends BaseEntity {
  tileIdx: string;
  constructor({
                x,
                y,
                tileIdx,
                height,
                width, tileType,
                tileLocationID,
                tileCharacterLevel
              }: ITileConstructor) {
    super(Tile);
    this.tileIdx = tileIdx;
    this.addComponent(new PositionComponent({x, y, height, width}));

    // 1 is grass, 7 is road
    // REFACTOR - Seems strange here.. (if type === 1?)
    // TODO reuse in setTileType
    if (tileType === 1 || tileType === 7 || tileType === 100 || tileType === 13) {
      this.addComponent(new TraversableComponent());
      this.addComponent(new CanSpawn(tileLocationID, tileCharacterLevel));
    }

    this.addComponent(new BackgroundComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.MAP_TILE_SHAPE,
        data: {
          tileType
        }
      }]
    ));
  }

  // TODO for Editor mode only, change the tile type
  setTileType(tileType: number) {
    if (tileType === 1 || tileType === 7 || tileType === 100 || tileType === 13) {
      this.addComponent(new TraversableComponent());
    } else {
      this.removeComponent(TRAVERSABLE_COMP);
    }

    this.removeComponent(BACKGROUND_COMP);
    this.addComponent(new BackgroundComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: AllowedUIShapes.MAP_TILE_SHAPE,
        data: {
          tileType
        }
      }]
    ));
  }
}

export default Tile;