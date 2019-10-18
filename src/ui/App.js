import React from 'react';
import GAME_PLATFORM from 'game-platform/dist';
import GameLoop from 'gameEngine/Game';
import {bit, resolution} from '../gameEngine/config';
import oneMap from 'levels/test_15x15';
import twoMap from 'levels/test_50x32';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
let {GameCanvas} = GAME_PLATFORM;



// TODO - At the end of a level, we should show some summary data about the level
// TODO move this configuration somewhere else
// TODO can this be loaded from a server somehow?
// TODO - Not sure how to specify the start pos in a new level
let levels = {
  0: {
    areas: {
      0: {
        tileMap: oneMap,
        portals: {
          '1-1' : { // tile on index 1-1 Y/X index
            target: {
              level: 1,
              area: 0
            }
          }
        },
        enemies: [], // Map of
        startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
          x:16,
          y:16
        }
      }
    }
  },
  1: {
    portals: [
    
    ],
    areas: {
      0: {
        tileMap: twoMap,
        portals: {},
        startPos: { // if not specified otherwise, this is where we start (useful for for new levels)
          x:16,
          y:16
        }
      }
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapCanvasEl: null,
      minimapCanvasEl: null,
      currentLevel: 0,
      currentArea: 0,
      mapHeight:null,
      mapWidth:null
    };
  }

  initGameCanvas(mapWidth, mapHeight) {
    return new GameCanvas({
      mapHeight,
      mapWidth,
      viewHeight: resolution.height,
      viewWidth: resolution.width,
      onViewMapMove: (dataObj) => {
      },
      onViewMapClick: (dataObj) => {
      },
      onMiniMapClick: () => {
        this.game.requestBackgroundRender();
      },
      onMiniMapMove: () => {
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
    // TODO this looks identical to startGame, can we combine these two?
    let nextArea = levels[levelNum].areas[areaNum];
    let areaTileMap = nextArea.tileMap;
    this.setNewCanvas(areaTileMap);
    
    let viewSize = {
      viewHeight: resolution.height,
      viewWidth: resolution.width,
      mapHeight:this.state.mapHeight,
      mapWidth: this.state.mapWidth
    };
    
    this.game.setLevelArea(nextArea, viewSize);
  }
  
  startGame() {
    // Load some initial state, what level are we on?
    let levelNum = this.state.currentLevel;
    let areaNum = this.state.currentArea;
    // Use the level to get the current map for that level
    let areaToLoad = levels[levelNum].areas[areaNum];
    let areaTileMap = areaToLoad.tileMap;
    this.setNewCanvas(areaTileMap);
  
    let mapWidth = areaTileMap[0].length * bit;
    let mapHeight = areaTileMap.length * bit;
    // Start the game loop
    setTimeout(() => {
      this.game = this.initGameLoop(areaToLoad, mapWidth, mapHeight);
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
          <div className='wrapper'>
            <div className='canvas-main-container'>
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