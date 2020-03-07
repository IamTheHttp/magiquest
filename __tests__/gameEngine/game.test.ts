import GameLoop from "../../src/gameEngine/Game";
import {resolution} from "../../src/gameEngine/config";
import {CHARACTERS} from "../../src/gameEngine/gameConstants";
import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";
import {ActOnEntityTriggers, MoveTriggers} from "../../src/interfaces/triggers.i";
import {PossibleTriggersArray} from "../../src/interfaces/levels.i";


describe('Full integration test for game.ts', () => {
  let entity;
  beforeEach(() => {
    // setup the test

  });

  it('can initialize the game', () => {
    new GameLoop({
      levelArea: {
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
        tileMap: [[1, 1, 1],[1, 1, 1],[1, 1, 1]],
        spawnableEnemies: [{
          chance: 1,
          enemy: CHARACTERS.SENTRY
        }]
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