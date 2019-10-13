import GAME_PLATFORM from 'game-platform/dist';
import {CANVAS_OUTPUT, MAP_TILE_SHAPE} from '../constants';
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import BackgroundComponent from '../components/BackgroundComponent';
import TraversableComponent from '../components/TraversableComponent';
import BaseEntity from '../BaseEntity';

let {Entity} = GAME_PLATFORM;

class Tile {
  constructor({x, y, height, width, tileType}) {
    let ent = new BaseEntity(Tile);
    
    ent.addComponent(new PositionComponent({x, y, height, width}));
    
    // 1 is grass
    if (tileType === 1) {
      ent.addComponent(new TraversableComponent());
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