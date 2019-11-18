import React from 'react';
import GAME_PLATFORM from 'game-platform/dist';
import GameLoop from 'gameEngine/Game';
import {bit, resolution, tileTypes} from '../gameEngine/config';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
import levelConfig from 'levels/levelConfig';
import tileSet from 'assets/tileSet.png';
import {Entity} from 'BaseEntity';
let {GameCanvas} = GAME_PLATFORM;

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id={'editor-panel'}>
        <div id='tiles'>
          {Object.keys(tileTypes).map((key) => {
            let {cropStartX, cropStartY, cropSizeX, cropSizeY} = tileTypes[key];

            let style = {
              backgroundImage: `url("${tileSet}")`,
              color: 'black',
              backgroundPosition: `-${cropStartX}px -${cropStartY}px`,
              width: `${cropSizeX}px`,
              height: `${cropSizeY}px`
            };

            let active = this.state.active === key ? 'active' : '';
            let cls = `tile ${active}`;

            return (
              <div
                key={key}
                className={cls}
                style={style}
                onClick={() => {
                  this.props.onTileSelect(key);
                  this.setState({
                    active:key
                  });
                }}
              >

              </div>
            );
          })}
        </div>
        <div>
          List of tiles
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapCanvasEl: null,
      minimapCanvasEl: null,
      currentLevel: 0,
      currentArea: 0,
      mapHeight: null,
      mapWidth: null
    };

    setTimeout(() => {
      this.clickToStartGame();
    }, 10);
  }

  initGameCanvas(mapWidth, mapHeight) {
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
            this.game.changeTileType(tile, this.state.editorTileType);
            // this is what was clicked.
            // what we want to do is set THIS col/row to be the tileType that's currently selected.
            // TODO - this should ONLY work in editor mode
          }
        });
      }
    }).getNewCanvasPairs({
      getMapRef: (API, el) => {
        window.API = API;
        API.addLayer('background');
        this.setState({
          mapAPI: API
        });
      },
      getMiniRef: (API, el) => {
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
    let {map, minimap} = this.initGameCanvas(mapWidth, mapHeight);

    this.setState({
      map,
      minimap,
      mapHeight,
      mapWidth
    });
  }

  changeMap(levelNum, areaNum) {
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
    let levelNum = this.state.currentLevel;
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
          <Editor
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