import createTileIndexMap from 'gameEngine/utils/createTileIndexMap';
import {AllowedZoneLocationIDs, PLACEABLE_ENTITIES} from 'gameEngine/gameConstants';
import {ISystemArguments} from '../../src/interfaces/IGameLoop';
import {fn} from './SpyFns';
import {Entity} from 'game-platform';
import GameEvents from '../../src/gameEngine/classes/GameEvents';
import Game from '../../src/gameEngine/Game';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';
import {TILE_SIZE} from '../../src/gameEngine/gameConstants';
import {createTestPlaceableEntity} from './createTestPlaceableEntity';
import PlaceableEntity from '../../src/gameEngine/entities/placeableEntities/PlaceableEntity';

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
  spyDrawRect: fn;
}

function createSystemArgs({
  spyPan,
  spyClear,
  spyAddImage,
  spyDraw,
  spyHandleAreaChange,
  spyDrawRect
}: ICreateSystemArgsArguments): MockedSystemArguments {
  let tileMap = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1]
  ];
  let viewSize = {
    mapWidth: TILE_SIZE * 3,
    mapHeight: TILE_SIZE * 3,
    viewWidth: TILE_SIZE * 3,
    viewHeight: TILE_SIZE * 3
  };

  return {
    placeableEntityDataMap: {
      [PLACEABLE_ENTITIES.IMP]: createTestPlaceableEntity({id: PLACEABLE_ENTITIES.IMP})
    },
    gameEvents: new GameEvents(),
    // @ts-ignore we'll only define one type here
    SPRITES: {
      TILE_GRASS: {
        cropStartX: 0,
        cropSizeX: 0,
        cropSizeY: 0,
        cropStartY: 0,
        image: new Image()
      }
    },
    destroyedPlaceableEntities: [],
    minimapAPI: undefined,
    Entity,
    shouldRenderBackground: true,
    zone: {
      chapter: 0,
      act: 0,
      description: '',
      exits: {},
      noSpawnLocations: [],
      monsterDensity: 0.01,
      spawnableEnemies: [PLACEABLE_ENTITIES.IMP],
      id: 'TEST LEVEL',
      locations: [],
      tileMap: [[]],
      entitiesToPlace: [],
      playerStartPos: {
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
      drawRect: spyDrawRect,
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
    indexedTileMap: createTileIndexMap(
      {
        chapter: 0,
        act: 0,
        description: '',
        exits: {},
        monsterDensity: 0,
        noSpawnLocations: [],
        spawnableEnemies: [],
        entitiesToPlace: [],
        id: 'Test Level',
        playerStartPos: {col: 0, row: 0},
        triggers: {actOnEntity: {}, levelStart: [], move: {}},
        locations: [
          {
            id: AllowedZoneLocationIDs.TOWN,
            locationEntityLevel: 1,
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
