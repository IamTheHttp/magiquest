import GameLoop from "../../src/gameEngine/Game";
import {resolution} from "../../src/gameEngine/config";
import {AllowedLevelLocationIDs, CHARACTERS} from "../../src/gameEngine/gameConstants";
import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";


describe('Full integration test for game.ts', () => {
  let entity;
  beforeEach(() => {
    // setup the test

  });

  it('can initialize the game', () => {
    new GameLoop({
      listenToEvents: () => {},
      levelArea: {
        locations: [{
          locationCharacterLevel: 1,
          id: AllowedLevelLocationIDs.TOWN,
          name: 'test area',
          spawnableEnemies: [{
            chance: 1,
            characterType: CHARACTERS.ENEMY
          }],
          start: {
            col: 0,
            row: 0,
          },
          end: {
            col: 2,
            row: 2
          }
        }],
        levelName: 'TEST',
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
        viewHeight: resolution.height,
        viewWidth: resolution.width,
        mapHeight:300,
        mapWidth: 300
      }
    });
  });
});