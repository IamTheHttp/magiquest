// import Entity from 'lib/ECS/Entity';
import GAME_PLATFORM from 'game-platform/dist';

let {Entity, entityLoop} = GAME_PLATFORM;

import renderSystem from './systems/renderSystem';
import Tile from './entities/Tile';
import Player from './entities/Player';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import throttle from './utils/throttle';

class GameLoop {
  constructor({getMapAPI, getMinimapAPI, tileMap, viewSize}) {
    this.renderBackground = true;
    let count = 0;
    Entity.reset();
    this.createMapEntites(tileMap, viewSize);
    new Player({x: 16, y: 16});
    
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 50);
    
    this.loop = () => {
      /* istanbul ignore else */
      if (true) {
        let systemArguments = {
          tileMap,
          Entity,
          viewSize,
          getRenderBackground: () => {
            return this.renderBackground;
          },
          mapAPI: getMapAPI(),
          miniMapAPI: getMinimapAPI(),
          game: this
        };
        
        userInputSystem();
        moveSystem(systemArguments);
  
  
        renderSystem(systemArguments);
        this.frameID = requestAnimationFrame(this.loop);
  
        this.renderBackground = false;
        count++;
      }
    };
    
    this.dispatchAction = this.dispatchAction.bind(this);
    this.resume();
  }
  
  requestBackgroundRender() {
    this.renderBackground = true;
  }
  
  createMapEntites(tileMap, viewSize) {
    let {mapHeight, mapWidth} = viewSize;
    
    for (let rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
      let row = tileMap[rowIdx];
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        let numOfCols = row.length;
        let numOfRows = tileMap.length;
        
        let tileWidth = mapWidth / numOfCols;
        let tileHeight = mapHeight / numOfRows; // num of cols
        
        new Tile({
          x: colIdx * tileWidth,
          y: rowIdx * tileHeight,
          width: tileWidth,
          height: tileHeight,
          tileType: tileMap[rowIdx][colIdx]
        });
      }
    }
  }
  
  resume() {
    this.frameID = requestAnimationFrame(this.loop);
  }
  
  stop() {
    cancelAnimationFrame(this.frameID);
  }
  
  /**
   * @param action {obj} - contains, {entityID}
   */
  dispatchAction(action) {
    pushAction(action);
  }
}

export default GameLoop;