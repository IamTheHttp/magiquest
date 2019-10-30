import React from 'react';
import GAME_PLATFORM from 'game-platform/dist';
import GameLoop from 'gameEngine/Game';
import {bit, resolution} from '../gameEngine/config';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
import levelConfig from 'levels/levelConfig';
let {GameCanvas} = GAME_PLATFORM;


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
      viewWidth: resolution.width
    }).getNewCanvasPairs({
      getMapRef: (API, el) => {
        window.API = API;
        API.addLayer('background');
        console.log('New API made');
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
    let areaToLoad = levelConfig[levelNum].areas[areaNum];
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