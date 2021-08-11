import GameLoop from "../../src/gameEngine/Game";
import CanvasAPI from "game-platform/dist/lib/CanvasAPI/CanvasAPI";
import {AllowedLevelLocationIDs, RESOLUTION} from "../../src/gameEngine/gameConstants";


describe('Full integration test for game.ts', () => {
  let entity;
  beforeEach(() => {
    // setup the test

  });

  it('can initialize the game', () => {
    new GameLoop({
      gameEventListener: () => {},
      levelArea: {
        noSpawnLocations:[],
        monsterDensity:0,
        spawnableEnemies:[],
        locations: [{
          locationCharacterLevel: 1,
          id: AllowedLevelLocationIDs.TOWN,
          name: 'test area',
          start: {
            col: 0,
            row: 0,
          },
          end: {
            col: 2,
            row: 2
          }
        }],
        levelAreaID: 'TEST',
        startPos: {
          col:0,
          row:0
        },
        triggers: {
          levelStart:[],
          actOnEntity: {},
          move: {}
        },
        entitiesToPlace: [],
        tileMap: [[1, 1, 1],[1, 1, 1],[1, 1, 1]]
      },
      onAreaChange: function (level, area) {
        this.changeMap(level, area);
      },
      getMapAPI: () => {
        return {
          getPan() {
            return 0;
          },
          pan(){

          }
        } as unknown as CanvasAPI
      },
      getMinimapAPI: () => {
        return {
          getPan() {
            return 0;
          },
          pan(){

          }
        } as unknown as CanvasAPI
      },
      viewSize: {
        viewHeight: RESOLUTION.height,
        viewWidth: RESOLUTION.width,
        mapHeight:300,
        mapWidth: 300
      }
    });
  });
});