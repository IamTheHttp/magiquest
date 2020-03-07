import GAME_PLATFORM from 'game-platform';
import createTileIndexMap from 'gameEngine/utils/createTileIndexMap';
import { CHARACTERS } from 'gameEngine/gameConstants';
import {ISystemArguments} from "../../src/interfaces/gameloop.i";
import {fn} from "./SpyFns";
import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";
import GameLoop from "Game";

let {Entity} = GAME_PLATFORM;

interface ICreateSystemArgsArguments {
  spyPan: fn;
  spyClear: fn;
  spyAddImage: fn;
  spyDraw: fn;
  spyHandleAreaChange:fn;
}

function createSystemArgs({spyPan, spyClear, spyAddImage, spyDraw, spyHandleAreaChange}: ICreateSystemArgsArguments): ISystemArguments {
  let tileMap = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  let viewSize = {
    mapWidth: 32 * 3,
    mapHeight: 32 * 3,
    viewWidth: 32 * 3,
    viewHeight: 32 * 3
  };

  return {
    characterSprite: undefined,
    minimapAPI: undefined,
    tileSetSprite: undefined,
    Entity,
    shouldRenderBackground: true,
    levelArea: {
      levelName: 'TEST LEVEL',
      locations: [],
      tileMap: [[]],
      entitiesToPlace: [],
      startPos: {
        col:1,
        row:1
      },

      triggers: {
        levelStart: [],
        actOnEntity:{},
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
    } as unknown as CanvasAPI,
    game: {
      requestBackgroundRender: () => {
      },
      notifyBackgroundWasRendered: () => {
      },
      handleAreaChange :spyHandleAreaChange
    } as unknown as GameLoop,
    tileIdxMap: createTileIndexMap({
      entitiesToPlace: [],
      levelName: "Test Level",
      startPos: {col: 0, row: 0},
      triggers: {actOnEntity: {}, levelStart: [], move: {}},
      locations: [
        {
          name: 'test',
          spawnableEnemies: [{
            chance: 1,
            enemy: CHARACTERS.SENTRY
          }],
          start: {
            col:0,
            row:0
          },
          end: {
            col:50,
            row:50
          }
        }
      ],
      tileMap
    }, viewSize, ),
    viewSize
  };
}


export default createSystemArgs;