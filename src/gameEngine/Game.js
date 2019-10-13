// import Entity from 'lib/ECS/Entity';
import GAME_PLATFORM from 'game-platform/dist';

let {Entity} = GAME_PLATFORM;

import renderSystem from './systems/renderSystem';
import Tile from './entities/Tile';
import Player from './entities/Player';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import throttle from './utils/throttle';
import Sentry from './entities/Sentry';
import aiSystem from './systems/ai';
import {bit} from './config';
import attackSystem from './systems/attackSystem';
import tiles from '../assets/tileSet.png';
import getPos from './utils/componentUtils/positionUtils/getPos';
import updateMapTileIdx from './utils/systemUtils/move/updateMapTileIdx';
import {ANIMATION_COMP} from './components/ComponentNamesConfig';
import animationSystem from './systems/animationSystem';
let tileSetImage = new Image();
tileSetImage.src = tiles;


// TODO - Where should we move this class?
class IndexedTile {
  /**
   * @param {Tile} tile
   */
  constructor(tile) {
    /**
     * @type {Object.<number, Entity>}
     */
    this.entities = {
      ['[[COUNT]]']: 0
    };
    
    /**
     * @type {Tile}
     */
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


class GameLoop {
  constructor({getMapAPI, getMinimapAPI, tileMap, viewSize}) {
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 2000);
    this.renderBackground = true; // for the first time

    
    // Reset the entities
    Entity.reset();
    // create a mapped index of all the tiles
    let tileIdxMap = this.createMapEntites(tileMap, viewSize);
    // create a player
    let player = new Player({x: 16, y: 16});
    let playerPOS = getPos(player);
    updateMapTileIdx({entity: player, tileIdxMap,  newX: playerPOS.x, newY: playerPOS.y});
  
    
    
    for (let i = 0; i < 1; i++) {
      // create an enemy
      let sentry = new Sentry({x: bit * 10 + bit / 2, y: bit * 10 + bit / 2, radius: bit / 4});
      let sentryPOS = getPos(sentry);
      updateMapTileIdx({entity: sentry, tileIdxMap,  newX: sentryPOS.x, newY: sentryPOS.y});
    }
    // arguments that are passed to every system
    let systemArguments = {
      tileIdxMap,
      tileSetImage,
      Entity,
      viewSize,
      getRenderBackground: () => {
        return this.renderBackground;
      },
      mapAPI: getMapAPI(),
      miniMapAPI: getMinimapAPI(),
      game: this
    };
  
    tileSetImage.onload = () => {
      this.loop = () => {
        userInputSystem(systemArguments);
        moveSystem(systemArguments);
        aiSystem(systemArguments);
        attackSystem(systemArguments);
        renderSystem(systemArguments);
        animationSystem(systemArguments);
        
        this.frameID = requestAnimationFrame(this.loop);
        this.renderBackground = false;
      };
  
      this.resume();
    };
    
    this.dispatchAction = this.dispatchAction.bind(this);
  }
  
  requestBackgroundRender() {
    this.renderBackground = true;
  }
  
  createMapEntites(tileMap, viewSize) {
    let {mapHeight, mapWidth} = viewSize;
  
    /**
     *
     * @type {Object.<string, IndexedTile>}
     */
    let idx = {};
    
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
      
        idx[`${rowIdx}-${colIdx}`] = new IndexedTile(tile);
  
        Object.defineProperty(idx[`${rowIdx}-${colIdx}`], 'entities', {
          writable: false
        });
        
        Object.defineProperty(idx[`${rowIdx}-${colIdx}`].entities, '[[COUNT]]', {
          enumerable: false,
          writable: true
        });
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