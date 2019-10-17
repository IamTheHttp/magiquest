import IndexedTile from '../../src/gameEngine/classes/IndexedTile';
import Tile from '../../src/gameEngine/entities/Tile';
import GAME_PLATFORM from 'game-platform/dist';

let {Entity} = GAME_PLATFORM;


function createSystemArgs({spyPan, spyClear, spyAddImage, spyDraw}) {
  let map = {
    '0-0': new IndexedTile(new Tile({y: 0, x: 0, tileType: 1})),
    '0-1': new IndexedTile(new Tile({y: 0, x: 1, tileType: 1})),
    '0-2': new IndexedTile(new Tile({y: 0, x: 2, tileType: 1})),
    '1-0': new IndexedTile(new Tile({y: 1, x: 0, tileType: 1})),
    '1-1': new IndexedTile(new Tile({y: 1, x: 1, tileType: 1})),
    '1-2': new IndexedTile(new Tile({y: 1, x: 2, tileType: 1})),
    '2-0': new IndexedTile(new Tile({y: 2, x: 0, tileType: 0})), // mountain
    '2-1': new IndexedTile(new Tile({y: 2, x: 1, tileType: 1})),
    '2-2': new IndexedTile(new Tile({y: 2, x: 2, tileType: 1}))
  };
  
  
  return {
    Entity,
    getRenderBackground: () => {
      return true; // always render background
    },
    mapAPI: {
      addImage: spyAddImage,
      draw: spyDraw,
      clear: spyClear,
      getPan: () => {
        return {
          panX: 0,
          panY: 0
        };
      },
      pan: spyPan
    },
    game: {
      requestBackgroundRender: () => {
      }
    },
    getCurrentMap() {
      return map;
    },
    
    viewSize: {
      mapWidth: 100,
      mapHeight: 100,
      viewWidth: 100,
      viewHeight: 100
    }
  };
}


export default createSystemArgs;