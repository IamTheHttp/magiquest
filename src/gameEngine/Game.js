// import Entity from 'lib/ECS/Entity';
import GAME_PLATFORM from 'game-platform/dist';

let {Entity} = GAME_PLATFORM;

import renderSystem from './systems/renderSystem';
import Tile from './entities/Tile';
import Player from './entities/Player';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem, {updateMapTileIdx} from './systems/moveSystem';
import throttle from './utils/throttle';
import Sentry from './entities/Sentry';
import aiSystem from './systems/ai';
import getPos from './components/utils/positionUtils/getPos';

class GameLoop {
  constructor({getMapAPI, getMinimapAPI, tileMap, viewSize}) {
    this.renderBackground = true;
    let count = 0;
    Entity.reset();
    let tileIdxMap = this.createMapEntites(tileMap, viewSize);
    let player = new Player({x: 16, y: 16});
    let playerPOS = getPos(player);
    updateMapTileIdx({entity: player, tileIdxMap,  newX: playerPOS.x, newY: playerPOS.y});
  
  
    let sentry = new Sentry({x: 32 * 1 + 16, y: 32 * 2 + 16});
    let sentryPOS = getPos(sentry);
    updateMapTileIdx({entity: sentry, tileIdxMap,  newX: sentryPOS.x, newY: sentryPOS.y});
    
    
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 16);
    
    this.loop = () => {
      let systemArguments = {
        tileIdxMap,
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
      // aiSystem();
      renderSystem(systemArguments);
      
      
      this.frameID = requestAnimationFrame(this.loop);
      this.renderBackground = false;
      count++;
    };
    
    this.dispatchAction = this.dispatchAction.bind(this);
    this.resume();
  }
  
  requestBackgroundRender() {
    this.renderBackground = true;
  }
  
  createMapEntites(tileMap, viewSize) {
    let {mapHeight, mapWidth} = viewSize;
  
    let idx = {};
    
    class indexedTile {
      constructor(tile) {
        this.entities = {
          ['[[COUNT]]']: 0
        };
        this.tile = tile;
      }
      addEnt(ent) {
        if (!this.entities[ent.id]) {
          this.entities['[[COUNT]]']++;
          this.entities[ent.id] = ent;
        }
      }
      removeEnt(ent) {
        if (this.entities[ent.id]) {
          this.entities['[[COUNT]]'] = Math.max(this.entities['[[COUNT]]'] - 1, 0);
          delete this.entities[ent.id];
        }
      }
      getEntCount() {
        return this.entities['[[COUNT]]'];
      }
    }
    
    for (let rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
      let row = tileMap[rowIdx];
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        let numOfCols = row.length;
        let numOfRows = tileMap.length;
      
        let tileWidth = mapWidth / numOfCols;
        let tileHeight = mapHeight / numOfRows; // num of cols
      
        let tile = new Tile({
          x: colIdx * tileWidth,
          y: rowIdx * tileHeight,
          width: tileWidth,
          height: tileHeight,
          tileType: tileMap[rowIdx][colIdx]
        });
      
        idx[`${rowIdx}-${colIdx}`] = new indexedTile(tile);
      }
    }
    return idx;
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