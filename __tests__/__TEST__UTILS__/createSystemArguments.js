import IndexedTile from '../../src/gameEngine/classes/IndexedTile';
import Tile from '../../src/gameEngine/entities/Tile';
import GAME_PLATFORM from 'game-platform/dist';

let {Entity} = GAME_PLATFORM;



function createSystemArgs(spyPan) {
  return {
    Entity,
    mapAPI: {
      getPan: () => {
        return {
          panX: 0,
          panY: 0
        };
      },
      pan: spyPan
    },
    game: {
      requestBackgroundRender: () => {}
    },
    tileIdxMap: {
      '0-0': new IndexedTile(new Tile({tileType: 1})),
      '0-1': new IndexedTile(new Tile({tileType: 1})),
      '0-2': new IndexedTile(new Tile({tileType: 1})),
      '1-0': new IndexedTile(new Tile({tileType: 1})),
      '1-1': new IndexedTile(new Tile({tileType: 1})),
      '1-2': new IndexedTile(new Tile({tileType: 1})),
      '2-0': new IndexedTile(new Tile({tileType: 0})), // mountain
      '2-1': new IndexedTile(new Tile({tileType: 1})),
      '2-2': new IndexedTile(new Tile({tileType: 1})),
    },
    viewSize: {
      mapWidth: 1000,
      mapHeight: 1000
    }
  };
}



export default createSystemArgs;