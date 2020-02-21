import * as  React from 'react';
import GAME_PLATFORM from 'game-platform';
import GameLoop from 'gameEngine/Game';
import {bit, resolution, tileTypes} from 'gameEngine/config';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
import levelConfig from 'levels/levelConfig';
import tileSet from 'assets/tileSet.png';
import {Entity} from 'gameEngine/BaseEntity';
import Editor from './Editor';
import IGameCanvas  from "game-platform/types/lib/GameCanvas/GameCanvas";

let {GameCanvas} = GAME_PLATFORM;

type IState = {
  mapCanvasEl: any;
  minimapCanvasEl: any;
  currentLevel: number;
  currentArea: number;
  mapHeight: any;
  mapWidth: any;
  minimap: any;
  map: any;
  active: any;
  isEditing: any;
  gameStarted: any;
  mapAPI: any;
  clickedTileIdx: any;
  editorTileType: any;
  minimapAPI: any;
};




class App extends React.Component<any, IState> {
  game: any;

  constructor(props) {
    super(props);

    this.state = {
      mapCanvasEl: null,
      minimapCanvasEl: null,
      currentLevel: 0,
      currentArea: 0,
      mapHeight: null,
      mapWidth: null,
      minimap: null,
      map: null,
      active: null,
      isEditing: null,
      gameStarted: null,
      mapAPI: null,
      clickedTileIdx: null,
      editorTileType: null,
      minimapAPI: null
    };

    setTimeout(() => {
      this.clickToStartGame();
    }, 10);
  }

  initGameCanvas(mapWidth, mapHeight): {map: HTMLCanvasElement, minimap: HTMLCanvasElement } {
    return new GameCanvas({
      mapHeight,
      mapWidth,
      viewHeight: resolution.height,
      viewWidth: resolution.width,
      onViewMapClick: (mouseClickData) => {
        mouseClickData.hits.forEach((shape) => {
          if (shape.layerName === 'background') {
            let entityID = shape.id.split('-')[0];
            let tile = Entity.entities[entityID];
            if (this.state.editorTileType) {
              this.game.changeTileType(tile, this.state.editorTileType);
            }
            this.setState({clickedTileIdx: tile.tileIdx});

            // this is what was clicked.
            // what we want to do is set THIS col/row to be the tileType that's currently selected.
            // TODO - this should ONLY work in editor mode
          }
        });
      }
    }).getNewCanvasPairs({
      getMapRef: (API) => {
        window.API = API;
        API.addLayer('background');
        this.setState({
          mapAPI: API
        });
      },
      getMiniRef: (API) => {
        this.setState({
          minimapAPI: API
        });
      }
    });
  }


  initGameLoop(areaToLoad, mapWidth, mapHeight) {
    return new GameLoop({
      levelArea: areaToLoad,
      onAreaChange: (level, area) => {
        this.changeMap(level, area);
      },
      getMapAPI: () => {
        return this.state.mapAPI;
      },
      getMinimapAPI: () => {
        return this.state.minimapAPI;
      },
      viewSize: {
        viewHeight: resolution.height,
        viewWidth: resolution.width,
        mapHeight,
        mapWidth
      }
    });
  }

  setNewCanvas(currentAreaMap) {
    if (this.state.mapAPI) {
      this.state.mapAPI.removeLayer('background');
    }

    let mapWidth = currentAreaMap[0].length * bit;
    let mapHeight = currentAreaMap.length * bit;

    // creates the new canvas
    let gameCanvas = this.initGameCanvas(mapWidth, mapHeight);

    let {map, minimap} = gameCanvas;

    this.setState({
      map,
      minimap,
      mapHeight,
      mapWidth
    });
  }

  changeMap(levelNum, areaNum) {
    this.setState({
      currentLevel: levelNum,
      currentArea: areaNum
    });

    let nextArea = levelConfig[levelNum].areas[areaNum];
    let areaTileMap = nextArea.tileMap;
    this.setNewCanvas(areaTileMap);

    let viewSize = {
      viewHeight: resolution.height,
      viewWidth: resolution.width,
      mapHeight: this.state.mapHeight,
      mapWidth: this.state.mapWidth
    };

    this.game.setLevelArea(nextArea, viewSize);
  }

  startGame() {
    // Load some initial state, what level are we on?
    let levelNum = this.state.currentLevel; // this should probably be set every time it changes
    let areaNum = this.state.currentArea;
    // Use the level to get the current map for that level
    let areaToLoad = levelConfig[levelNum].areas[areaNum];
    let areaTileMap = areaToLoad.tileMap;
    this.setNewCanvas(areaTileMap);

    let mapWidth = areaTileMap[0].length * bit;
    let mapHeight = areaTileMap.length * bit;
    // Start the game loop
    setTimeout(() => {
      this.game = this.initGameLoop(areaToLoad, mapWidth, mapHeight);
      window.game = this.game;
      registerUserInputEvents(this.game);
    }, 0);
  }


  clickToStartGame() {
    this.startGame();
    this.setState({
      gameStarted: true
    });
  }

  render() {
    if (!this.state.gameStarted) {
      return (
        <div>
          <button
            id={'start'}
            onClick={() => {
              this.clickToStartGame();
            }}
          >Start Game
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => {
              this.setState({
                isEditing: true
              });
            }}
          >
            Editor
          </button>
          <h1>
            {this.state.currentLevel}-{this.state.currentArea}
          </h1>
          <Editor
            clickedTileIdx={this.state.clickedTileIdx}
            onTileSelect={(tileType) => {
              this.setState({
                editorTileType: tileType
              });
            }}
          />
          <div
            className='wrapper'>
            <div
              className='canvas-main-container'>
              {this.state.map}
            </div>
          </div>

          <div className='canvas-minimap-container'>
            {this.state.minimap}
          </div>
        </div>
      );
    }
  }
}


export default App;