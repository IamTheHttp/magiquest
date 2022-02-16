import createTileIndexMap from 'gameEngine/utils/createTileIndexMap';
import {AllowedLevelLocationIDs, CHARACTERS} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../src/interfaces/IGameLoop';
import {fn} from './SpyFns';
import {Entity} from 'game-platform';
import GameEvents from '../../src/gameEngine/classes/GameEvents';
import Game from '../../src/gameEngine/Game';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';

export type MockedSystemArguments = Omit<ISystemArguments, 'mapAPI' | 'game'> & {
  mapAPI: Partial<Painter>;
  game: Partial<Game>;
};

interface ICreateSystemArgsArguments {
  spyPan: fn;
  spyClear: fn;
  spyAddImage: fn;
  spyDraw: fn;
  spyHandleAreaChange: fn;
}

function createSystemArgs({
  spyPan,
  spyClear,
  spyAddImage,
  spyDraw,
  spyHandleAreaChange
}: ICreateSystemArgsArguments): MockedSystemArguments {
  let tileMap = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1]
  ];
  let viewSize = {
    mapWidth: 32 * 3,
    mapHeight: 32 * 3,
    viewWidth: 32 * 3,
    viewHeight: 32 * 3
  };

  return {
    gameEvents: new GameEvents(),
    characterSprite: undefined,
    minimapAPI: undefined,
    tileSetSprite: undefined,
    Entity,
    shouldRenderBackground: true,
    zone: {
      noSpawnLocations: [],
      monsterDensity: 0.01,
      spawnableEnemies: [CHARACTERS.IMP],
      zoneID: 'TEST LEVEL',
      locations: [],
      tileMap: [[]],
      entitiesToPlace: [],
      startPos: {
        col: 1,
        row: 1
      },

      triggers: {
        levelStart: [],
        actOnEntity: {},
        move: {}
      }
    },
    mapAPI: {
      drawImage: spyAddImage,
      drawAllShapesInLayer: spyDraw,
      clearAllShapesInLayer: spyClear,
      getCurrentPanValue: () => {
        return {
          panX: 0,
          panY: 0
        };
      },
      panCamera: spyPan
    },
    game: {
      requestBackgroundRender: () => {},
      notifyBackgroundWasRendered: () => {},
      handleZoneChange: spyHandleAreaChange
    },
    tileIdxMap: createTileIndexMap(
      {
        monsterDensity: 0,
        noSpawnLocations: [],
        spawnableEnemies: [],
        entitiesToPlace: [],
        zoneID: 'Test Level',
        startPos: {col: 0, row: 0},
        triggers: {actOnEntity: {}, levelStart: [], move: {}},
        locations: [
          {
            id: AllowedLevelLocationIDs.TOWN,
            locationCharacterLevel: 1,
            name: 'test',
            start: {
              col: 0,
              row: 0
            },
            end: {
              col: 50,
              row: 50
            }
          }
        ],
        tileMap
      },
      viewSize
    ),
    viewSize
  };
}

export default createSystemArgs;
