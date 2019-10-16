import React from 'react';
import GAME_PLATFORM from 'game-platform/dist';
import GameLoop from 'gameEngine/Game';
import {MOVE_ACTION, ATTACK_ACTION} from '../gameEngine/gameConstants';

let {GameCanvas} = GAME_PLATFORM;
import tileMap from 'levels/test_15x15';
import {bit} from '../gameEngine/config';
import throttle from '../gameEngine/utils/throttle';


let mapWidth = tileMap[0].length * bit;
let mapHeight = tileMap.length * bit;

// MAIN VIEW, Where the player moves!
// This is the actual resolution of the player, changing these values will create bigger displays
let viewWidth = 400 * 1;
let viewHeight = 240 * 1;

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
    let glob = {};
  
    // TODO - we should keep our own tracking of what's up and what's down
    // this will allow us to fire while we move
    // (We should not STOP the user every time any key is up, only the arrow keys in the direction we were going to
    document.body.addEventListener('keyup', (event) => {
      glob.keyPressed = false;
      // Stop.. on key up, right?
      this.game.dispatchAction({
        name: MOVE_ACTION
      });
    });
    
    document.body.addEventListener('keydown', (event) => {
      if (glob.keyPressed) {
        return true;
      }
      
      glob.keyPressed = true;
      
      let code = event.which || event.keyCode || event.code;
      let map = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
      };
  
      if (code === 32) {
        this.game.dispatchAction({
          name: ATTACK_ACTION
        });
      }
  
      let direction = map[code];
  
      if (direction) {
        this.game.dispatchAction({
          name: MOVE_ACTION,
          direction
        });
      }
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