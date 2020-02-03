import GAME_PLATFORM from 'game-platform/dist';
import renderSystem from './systems/renderSystem';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import triggerSystem, {pushTrigger, Trigger} from './systems/triggerSystem';
import moveSystem from './systems/moveSystem';
import throttle from './utils/throttle';
import aiSystem from './systems/aiSystem';
import attackSystem from './systems/attackSystem';
import tileSetImageURL from '../assets/tileSet.png';
import animationSystem from './systems/animationSystem';
import charSpriteURL from 'assets/characters.png';
import portalSystem from 'gameEngine/systems/portalSystem';

let {Entity, Engine} = GAME_PLATFORM;
import {assetLoader} from 'cache/assetLoader';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import placeLevelTerrainTiles from 'gameEngine/utils/placeLevelTerrainTiles';
import placeLevelEntities from 'gameEngine/utils/placeLevelEntities';
import placePlayerInLevel from 'gameEngine/utils/placePlayerInLevel';
import centerCameraOnEntity from 'gameEngine/utils/systemUtils/centerCameraOnEntity';
import destroyAllButPlayer from 'gameEngine/utils/destroyAllButPlayer';
import Tile from 'gameEngine/entities/Tile';
import assertType from 'gameEngine/utils/assertType';

class GameLoop {
  engine:any;
  getMapAPI:any;
  getMinimapAPI:any;
  onAreaChange: any;
  tileIdxMap: any;
  viewSize: any;
  levelArea:any;
  renderBackground:any;
  isRunning: boolean;

  constructor({getMapAPI, getMinimapAPI, levelArea, viewSize, onAreaChange}) {
    Entity.reset();

    let engine = new Engine();
    this.engine = engine;
    this.getMapAPI = getMapAPI;
    this.getMinimapAPI = getMinimapAPI;
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 2000);
    this.dispatchAction = this.dispatchAction.bind(this);
    this.onAreaChange = onAreaChange;

    this.setLevelArea(levelArea, viewSize);

    engine.addSystem(userInputSystem);
    engine.addSystem(triggerSystem);
    engine.addSystem(moveSystem);
    engine.addSystem(aiSystem);
    engine.addSystem(attackSystem);
    engine.addSystem(renderSystem);
    engine.addSystem(animationSystem);
    engine.addSystem(portalSystem);
    engine.addSystem(spawnEnemiesSystem);

    this.resume();
  }

  getSystemArguments(getMapAPI, getMinimapAPI) {
    return {
      tileIdxMap: this.tileIdxMap,
      levelArea: this.levelArea,
      tileSetSprite: assetLoader.getAsset(tileSetImageURL),
      characterSprite: assetLoader.getAsset(charSpriteURL),
      Entity,
      viewSize: this.viewSize,
      shouldRenderBackground: this.renderBackground,
      game: this,
      mapAPI: getMapAPI(),
      minimapAPI: getMinimapAPI()
    };
  }

  /**
   *
   * @param {levelArea} levelArea
   * @param viewSize
   */
  setLevelArea(levelArea, viewSize) {
    let {viewWidth, viewHeight, mapWidth, mapHeight} = viewSize;
    let mapAPI = this.getMapAPI();
    this.renderBackground = true; // for the first time
    this.levelArea = levelArea;
    this.viewSize = viewSize;

    destroyAllButPlayer();

    this.tileIdxMap = placeLevelTerrainTiles(levelArea.tileMap, viewSize, levelArea.spawnableEnemies);
    let player = placePlayerInLevel(levelArea, this.tileIdxMap);
    placeLevelEntities(levelArea, this.tileIdxMap);

    // set triggers
    let hasStartTriggers = levelArea.triggers.levelStart.length;
    hasStartTriggers && levelArea.triggers.levelStart.forEach((configuredTrigger) => {
      // activateTrigger ...
      if (configuredTrigger.type === 'dialog') {
        pushTrigger(new Trigger({
          type: 'dialog',
          lines: configuredTrigger.lines,
          actedOnEntity: player
        }));
      }
    });

    centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
    this.renderBackground = true; // for the first time
  }

  // For editor mode only
  changeTileType(tile, newType) {
    assertType(tile, 'Tile', 'object');
    let [col, row] = tile.tileIdx.split('-');
    let idx = tile.tileIdx;

    this.levelArea.tileMap[row][col] = +newType;
    destroyAllButPlayer();
    this.tileIdxMap = placeLevelTerrainTiles(this.levelArea.tileMap, this.viewSize, this.levelArea.spawnableEnemies);

    this.renderBackground = true; // for the first time
    console.log(JSON.stringify(this.levelArea.tileMap));
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

  resume() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.engine.run(() => {
        return this.getSystemArguments(this.getMapAPI, this.getMinimapAPI);
      });
    }
  }

  stop() {
    this.isRunning = false;
    this.engine.stop();
  }

  activateTrigger(trigger) {
    pushTrigger(trigger);
  }

  /**
   * @param action {Object} - contains, {entityID}
   */
  dispatchAction(action) {
    pushAction(action);
  }
}


export default GameLoop;