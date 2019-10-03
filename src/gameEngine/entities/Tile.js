import GAME_PLATFORM from 'game-platform/dist';
import {CANVAS, RECT, MAP_TILE} from '../constants';
import UIComponent from '../components/UIComponent';
import PositionComponent from '../components/PositionComponent';
import BackgroundComponent from '../components/BackgroundComponent';

let {Entity} = GAME_PLATFORM;

class Tile {
  constructor({x, y, height, width, tileType}) {
    let ent = new Entity(Tile);
    
    ent.addComponent(new PositionComponent({x, y, height, width}));
    
    ent.addComponent(new BackgroundComponent(
      [{
        name: CANVAS,
        shape: MAP_TILE,
        data: {
          tileType
        }
      }]
    ));
    return ent;
  }
}

export default Tile;