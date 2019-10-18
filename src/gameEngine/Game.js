import GAME_PLATFORM from 'game-platform/dist';
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
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import portalSystem from 'systems/portalSystem';
import {PLAYER_CONTROLLED_COMP} from 'components/ComponentNamesConfig';
import {bit} from 'config';

let {Entity} = GAME_PLATFORM;
// TODO move to some image buffer?
let tileSetSprite = new Image();
tileSetSprite.src = tileSetImageURL;

let characterSprite = new Image();
characterSprite.src = charSpriteURL;


// for (let i = 0; i < 0; i++) {
//   // create an enemy
//   let sentry = new Sentry({x: bit * 10 + bit / 2, y: bit * 10 + bit / 2, radius: bit / 4});
//   let sentryPOS = sentry.getPos();
//   updateMapTileIdx({entity: sentry, tileIdxMap, newX: sentryPOS.x, newY: sentryPOS.y});
// }

// create a player
// TODO this should be based on the configuration of the level



class GameLoop {
  constructor({getMapAPI, getMinimapAPI, levelArea, viewSize, onAreaChange}) {
    Entity.reset();
    this.getMapAPI = getMapAPI;
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 2000);
    this.dispatchAction = this.dispatchAction.bind(this);
    this.onAreaChange = onAreaChange;
  
    this.setLevelArea(levelArea, viewSize);
    
    this.loop = () => {
      let systemArguments = this.getSystemArguments(getMapAPI, getMinimapAPI);
      
      userInputSystem(systemArguments);
      moveSystem(systemArguments);
      aiSystem(systemArguments);
      attackSystem(systemArguments);
      renderSystem(systemArguments);
      animationSystem(systemArguments);
      portalSystem(systemArguments);
      
      this.frameID = requestAnimationFrame(this.loop);
    };
    
    this.resume();
  }
  
  getSystemArguments(getMapAPI, getMinimapAPI) {
    return {
      tileIdxMap: this.tileIdxMap,
      levelArea: this.levelArea,
      tileSetSprite,
      characterSprite,
      Entity,
      viewSize: this.viewSize,
      shouldRenderBackground: this.renderBackground,
      game: this,
      mapAPI: getMapAPI(),
      minimapAPI: getMinimapAPI()
    };
  }
  
  setLevelArea(levelArea, viewSize) {
    // DONE - destroy the entities in the current tile map
    // DONE - destroy the old indexTile
  
    let mapAPI = this.getMapAPI();
    let ents = Entity.getByComps('BACKGROUND_COMP');
    entityLoop(ents, (ent) => {
      ent.destroy();
    });
  
    this.renderBackground = true; // for the first time
    this.levelArea = levelArea;
    this.viewSize = viewSize;
    this.tileIdxMap = this.createMapEntites(levelArea.tileMap, viewSize);
    
    // TODO - Init the level
    // TODO Create player in proper position!
    // TODO Create enemies in proper position
    // TODO Ensure enemies/player occupy their place in the map
    
    let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
    
    let {x, y} = levelArea.startPos;
    if (!player) {
      player = new Player({x, y});
    } else {
      player.setPos({x, y});
      player.stop();
      mapAPI.pan(x - bit / 2, y - bit / 2);
    }
    
    updateMapTileIdx({entity: player, tileIdxMap: this.tileIdxMap, newX: x, newY: y});
    this.renderBackground = true; // for the first time
  }
  
  handleAreaChange(level, area) {
    this.onAreaChange(level, area);
  }
  
  requestBackgroundRender() {
    this.renderBackground = true;
  }
  
  notifyBackgroundWasRendered() {
    this.renderBackground = false;
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