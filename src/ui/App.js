import React from 'react';
import GAME_PLATFORM from 'game-platform/dist';
import GameLoop from 'gameEngine/Game';
import {MOVE_ACTION} from '../gameEngine/constants';

let {GameCanvas} = GAME_PLATFORM;
import tileMap from 'levels/test_15x15';
import {bit} from '../gameEngine/config';




let mapWidth = tileMap[0].length * bit;
let mapHeight = tileMap.length * bit;

// MAIN VIEW, Where the player moves!
// This is the actual resolution of the player, changing these values will create bigger displays
let viewWidth = 400 * 3;
let viewHeight = 240 * 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCanvasEl: null,
      minimapCanvasEl: null
    };
  }
  
  componentDidMount() {
    // app starts game...
    this.startGame();
    this.registerUserInputEvents();
  }
  
  initGameCanvas() {
    return new GameCanvas({
      mapHeight,
      mapWidth,
      viewHeight,
      viewWidth,
      onViewMapMove: (dataObj) => {
      },
      onViewMapClick: (dataObj) => {
      },
      onMiniMapClick:() => {
        this.game.requestBackgroundRender();
      },
      onMiniMapMove:() => {
      }
    }).getNewCanvasPairs({
      getMapRef: (API, el) => {
        // Todo - feels strange that we need this here...
        console.log(API);
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
  
  initGameLoop() {
    return new GameLoop({
      tileMap,
      getMapAPI: () => {
        return this.state.mapAPI;
      },
      getMinimapAPI: () => {
        return this.state.minimapAPI;
      },
      viewSize: {
        viewHeight,
        viewWidth,
        mapHeight,
        mapWidth
      }
    });
  }
  
  startGame() {
    let {map, minimap} = this.initGameCanvas();
    
    // the game needs the canvas to be ready, and it will be the next tick
    setTimeout(() => {
      this.game = this.initGameLoop();
    }, 0);
    
    this.setState({
      map,
      minimap
    });
  }
  
  registerUserInputEvents() {
    document.body.addEventListener('keyup', (event) => {
      let map = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };
      
      let code = event.which || event.keyCode || event.code;
      let direction = map[code];
      
      this.game.dispatchAction({
        name: MOVE_ACTION,
        direction
      });
    });
  }
  
  render() {
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


export default App;