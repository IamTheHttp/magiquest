import {CANVAS_OUTPUT, CHARACTERS, MAP_TILE_SHAPE} from '../gameConstants';
import PositionComponent from '../components/PositionComponent';
import BackgroundComponent from '../components/BackgroundComponent';
import TraversableComponent from '../components/TraversableComponent';
import BaseEntity from '../BaseEntity';
import CanSpawn from 'gameEngine/components/CanSpawn';

class Tile {
  constructor({x, y, tileIdx, height, width, tileType, spawnableEnemies = []}) {
    let ent = new BaseEntity(Tile);

    ent.tileIdx = tileIdx;
    ent.addComponent(new PositionComponent({x, y, height, width}));

    // 1 is grass, 7 is road
    // REFACTOR - Seems strange here.. (if type === 1?)
    if (tileType === 1 || tileType === 7 || tileType === 100) {
      ent.addComponent(new TraversableComponent());
      ent.addComponent(new CanSpawn(spawnableEnemies));
    }


    ent.addComponent(new BackgroundComponent(
      [{
        name: CANVAS_OUTPUT,
        shape: MAP_TILE_SHAPE,
        data: {
          tileType
        }
      }]
    ));
    return ent;
  }
}

export default Tile;