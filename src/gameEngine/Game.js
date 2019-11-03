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
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import portalSystem from 'systems/portalSystem';
import {AI_CONTROLLED_COMP, BACKGROUND_COMP, PLAYER_CONTROLLED_COMP} from 'components/ComponentNamesConfig';

let {Entity, Engine} = GAME_PLATFORM;
import {assetLoader} from 'cache/assetLoader';
import spawnEnemiesSystem from 'systems/spawnEnemiesSystem';
import placeLevelTerrainTiles from 'utils/placeLevelTerrainTiles';
import placeLevelEntities from 'utils/placeLevelEntities';
import placePlayerInLevel from 'utils/placePlayerInLevel';
import centerCameraOnEntity from 'utils/systemUtils/centerCameraOnEntity';
import destroyAIEntities from 'utils/destroyAIEntities';
import destroyBackgroundEntities from 'utils/destroyBackgroundEntities';

class GameLoop {
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

    destroyAIEntities();
    destroyBackgroundEntities();

    this.tileIdxMap = placeLevelTerrainTiles(levelArea.tileMap, viewSize, levelArea.spawnableEnemies);
    let player = placePlayerInLevel(levelArea, this.tileIdxMap);
    placeLevelEntities(levelArea, this.tileIdxMap);

    // set triggers
    let hasStartTriggers = levelArea.triggers.levelStart.length;
    hasStartTriggers && levelArea.triggers.levelStart.forEach((configuredTrigger) => {
      // activateTrigger ...
      // TODO should really be a utility function as it WILL be reused inside the systems
      if (configuredTrigger.type === 'dialog') {
        pushTrigger(new Trigger({
          type: 'dialog',
          lines: configuredTrigger.lines,
          actedOnEntity: player
        }));
      }
    });

    // do we have any
    // if (levelArea.dialogs.start) {
    //   player.addComponent(new Dialog(levelArea.dialogs.start));
    // }

    centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
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