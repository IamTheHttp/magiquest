// import Entity from 'lib/ECS/Entity';
import GAME_PLATFORM from 'game-platform/dist';

let {Entity} = GAME_PLATFORM;

import renderSystem from './systems/renderSystem';
import Tile from './entities/Tile';
import Player from './entities/Player';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import throttle from './utils/throttle';
import aiSystem from './systems/aiSystem';
import attackSystem from './systems/attackSystem';
import tileSetImageURL from '../assets/tileSet.png';
import updateMapTileIdx from './utils/systemUtils/move/updateMapTileIdx';
import animationSystem from './systems/animationSystem';
import IndexedTile from './classes/IndexedTile';
import charSpriteURL from 'assets/finalchar.png';


let tileSetSprite = new Image();
tileSetSprite.src = tileSetImageURL;

let characterSprite = new Image();
characterSprite.src = charSpriteURL;


// Levels/areas are coded in index/index fashion --   1-1 level1-area1  -- 0-0 level0-area0

// Entity..
// We can create a Portal system to detect when a player tries to move to a portal
// or when he walks ON a portal
// class Portal {
//   constructor({x, y, action}) {
//
//   }
// }
//
// class LevelArea {
//   constructor(areaName, onAreaChange) {
//     this.name = areaName;
//     // this.tileMap = [];
//     // this.enemies = [];
//     // this.treasures = [];
//     // this.portals = [];
//   }
// }
//
// class Level {
//   constructor() {
//
//     this.areas = [
//       new LevelArea('The start', this.handleAreaChange)
//     ];
//   }
//
//   handleAreaChange() {
//
//   }
// }

//
// let levels = [
//   new Level(),
//   new Level(),
//   new Level()
// ];
//
//
//


// move system
// portal system // Detect we went over a portal
// Contact the game, request to load a new area, or a new level, based on the portal
// render system will ask the game what map is currently needed


class GameLoop {
  constructor({getMapAPI, getMinimapAPI, areaToLoad, viewSize}) {
    Entity.reset();
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 2000);
  
    this.areaToLoad = areaToLoad;
    this.viewSize = viewSize;
    this.renderBackground = true; // for the first time
  
    let tileMap = areaToLoad.tileMap;
  
    // Reset the entities
    // create a mapped index of all the tiles
    this.tileIdxMap = this.createMapEntites(tileMap, viewSize);
    
    // create a player
    
    
    
    // TODO this should be based on the configuration of the level
    let player = new Player({x: 16, y: 16});
    let playerPOS = player.getPos();
    updateMapTileIdx({entity: player, tileIdxMap: this.tileIdxMap, newX: playerPOS.x, newY: playerPOS.y});
    
    
    
    // for (let i = 0; i < 0; i++) {
    //   // create an enemy
    //   let sentry = new Sentry({x: bit * 10 + bit / 2, y: bit * 10 + bit / 2, radius: bit / 4});
    //   let sentryPOS = sentry.getPos();
    //   updateMapTileIdx({entity: sentry, tileIdxMap, newX: sentryPOS.x, newY: sentryPOS.y});
    // }
    
    // arguments that are passed to every system
    this.systemArguments = {
      getCurrentMap: () => {
        return this.getCurrentMap();
      },
      tileSetSprite,
      characterSprite,
      Entity,
      viewSize: this.getViewSize(),
      getRenderBackground: () => {
        return this.renderBackground;
      },
      game: this
    };
    
    this.loop = () => {
      // if we switched mapAPIs (for example, when we draw a new canvas)
      if (this.systemArguments.mapAPI !== getMapAPI()) {
        this.systemArguments.mapAPI = getMapAPI();
        this.systemArguments.miiniMapAPI = getMinimapAPI();
        this.renderBackground = true;
      }
      
      userInputSystem(this.systemArguments);
      moveSystem(this.systemArguments);
      aiSystem(this.systemArguments);
      attackSystem(this.systemArguments);
      renderSystem(this.systemArguments);
      animationSystem(this.systemArguments);
      
      this.frameID = requestAnimationFrame(this.loop);
      this.renderBackground = false;
    };
    
    this.resume();
    
    this.dispatchAction = this.dispatchAction.bind(this);
  }
  
  getViewSize() {
    return this.viewSize;
  }
  
  changeMap(areaToLoad, viewSize) {
    let currentAreaMap = areaToLoad.tileMap;
    
    // Create new tileIdx
    this.tileIdxMap = this.createMapEntites(currentAreaMap, viewSize);
    // TODO destroy the entities in the current tile map
    // TODO destroy the old indexTile
  
    // TODO update system Arguments for viewSize/
    // TODO system arguments needs a better representation, it seems hacky
    this.systemArguments.viewSize = viewSize;
    // TODO - Init the level
    // TODO Create player in proper position!
    // TODO Create enemies in proper position
    // TODO - Ensure enemies/player occupy their place in the map
  }
  
  getCurrentMap() {
    return this.tileIdxMap;
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