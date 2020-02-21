import IndexedTile from '../../src/gameEngine/classes/IndexedTile';
import Tile from '../../src/gameEngine/entities/Tile';
import GAME_PLATFORM from 'game-platform/dist';
import createTileIndexMap from 'gameEngine/utils/createTileIndexMap';
import { CHARACTERS } from 'gameEngine/gameConstants';

let {Entity} = GAME_PLATFORM;


function createSystemArgs({spyPan, spyClear, spyAddImage, spyDraw, spyHandleAreaChange}) {
  let tileMap = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  let viewSize = {
    mapWidth: 32 * 3,
    mapHeight: 32 * 3
  };

  return {
    Entity,
    shouldRenderBackground: true,
    levelArea: {
      triggers: {
        move: {}
      }
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
      },
      notifyBackgroundWasRendered: () => {
      },
      handleAreaChange :spyHandleAreaChange
    },
    tileIdxMap: createTileIndexMap(tileMap, viewSize, [{
      chance: 1,
      enemy: CHARACTERS.SENTRY
    }]),
    viewSize: {
      mapWidth: 100,
      mapHeight: 100,
      viewWidth: 100,
      viewHeight: 100
    }
  };
}


export default createSystemArgs;