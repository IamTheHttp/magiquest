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
import charSpriteURL from 'assets/characters.png';
import entityLoop from 'game-platform/src/lib/ECS/util/entityLoop';
import portalSystem from 'systems/portalSystem';
import {AI_CONTROLLED_COMP, BACKGROUND_COMP, PLAYER_CONTROLLED_COMP} from 'components/ComponentNamesConfig';
import {bit} from 'config';

let {Entity, Engine} = GAME_PLATFORM;
import {assetLoader} from 'cache/assetLoader';
import Sentry from 'entities/Sentry';
import ShockWave from 'entities/ShockWave';
import spawnEnemiesSystem from 'systems/spawnEnemiesSystem';
import {CHARACTERS} from 'gameConstants';
import assertType from 'utils/assertType';
import FamNPC from 'entities/FamNPC';

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

  setLevelArea(levelArea, viewSize) {
    let mapAPI = this.getMapAPI();
    let oldTiles = Entity.getByComps(BACKGROUND_COMP);
    entityLoop(oldTiles, (ent) => {
      ent.destroy();
    });

    let oldEnemies = Entity.getByComps(AI_CONTROLLED_COMP);
    entityLoop(oldEnemies, (ent) => {
      ent.destroy();
    });

    this.renderBackground = true; // for the first time
    this.levelArea = levelArea;
    this.viewSize = viewSize;

    this.tileIdxMap = this.createMapEntites(levelArea.tileMap, viewSize, levelArea.spawnableEnemies);

    // create player
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

    // create entities
    for (let i = 0; i < levelArea.entitiesToPlace.length; i++) {
      let entityToPlace = levelArea.entitiesToPlace[i];

      /**
       *
       * @type {BaseEntity}
       */
      let entity = null;

      let x = entityToPlace.pos.col * bit + 0.5 * bit;
      let y = entityToPlace.pos.row * bit + 0.5 * bit;

      // create an entity
      if (entityToPlace.type === CHARACTERS.SENTRY) {
        entity = new Sentry({x, y});
      }

      if (entityToPlace.type === CHARACTERS.FAM_NPC) {
        entity = new FamNPC({x, y});
      }

      if (!entity) {
        assertType(entity, 'Entity to place', 'object');
        return;
      }

      updateMapTileIdx({entity, tileIdxMap: this.tileIdxMap, newX: entity.getPos().x, newY: entity.getPos().y});
    }

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

  createMapEntites(tileMap, viewSize, spawnableEnemies) {
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
          tileType: tileMap[rowIdx][colIdx],
          spawnableEnemies
        });

        let tileIndex = `${rowIdx}-${colIdx}`;
        idx[tileIndex] = new IndexedTile(tile, tileIndex);

        Object.defineProperty(idx[tileIndex], 'entities', {
          writable: false
        });
      }
    }
    return idx;
  }

  resume() {
    this.engine.run(() => {
      return this.getSystemArguments(this.getMapAPI, this.getMinimapAPI);
    });
  }

  stop() {
    this.engine.stop();
  }

  /**
   * @param action {obj} - contains, {entityID}
   */
  dispatchAction(action) {
    pushAction(action);
  }
}


export default GameLoop;