import GAME_PLATFORM from 'game-platform/dist';
import renderSystem from './systems/renderSystem';
import userInputSystem, { pushAction } from './systems/userInputSystem';
import triggerSystem, { pushTrigger, Trigger } from './systems/triggerSystem';
import moveSystem from './systems/moveSystem';
import throttle from './utils/throttle';
import aiSystem from './systems/aiSystem';
import attackSystem from './systems/attackSystem';
import tileSetImageURL from '../assets/tileSet.png';
import animationSystem from './systems/animationSystem';
import charSpriteURL from 'assets/characters.png';
import portalSystem from 'gameEngine/systems/portalSystem';
var Entity = GAME_PLATFORM.Entity, Engine = GAME_PLATFORM.Engine;
import { assetLoader } from 'cache/assetLoader';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import placeLevelTerrainTiles from 'gameEngine/utils/placeLevelTerrainTiles';
import placeLevelEntities from 'gameEngine/utils/placeLevelEntities';
import placePlayerInLevel from 'gameEngine/utils/placePlayerInLevel';
import centerCameraOnEntity from 'gameEngine/utils/systemUtils/centerCameraOnEntity';
import destroyAllButPlayer from 'gameEngine/utils/destroyAllButPlayer';
import assertType from 'gameEngine/utils/assertType';
var GameLoop = /** @class */ (function () {
    function GameLoop(_a) {
        var getMapAPI = _a.getMapAPI, getMinimapAPI = _a.getMinimapAPI, levelArea = _a.levelArea, viewSize = _a.viewSize, onAreaChange = _a.onAreaChange;
        Entity.reset();
        var engine = new Engine();
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
    GameLoop.prototype.getSystemArguments = function (getMapAPI, getMinimapAPI) {
        return {
            tileIdxMap: this.tileIdxMap,
            levelArea: this.levelArea,
            tileSetSprite: assetLoader.getAsset(tileSetImageURL),
            characterSprite: assetLoader.getAsset(charSpriteURL),
            Entity: Entity,
            viewSize: this.viewSize,
            shouldRenderBackground: this.renderBackground,
            game: this,
            mapAPI: getMapAPI(),
            minimapAPI: getMinimapAPI()
        };
    };
    /**
     *
     * @param {levelArea} levelArea
     * @param viewSize
     */
    GameLoop.prototype.setLevelArea = function (levelArea, viewSize) {
        var viewWidth = viewSize.viewWidth, viewHeight = viewSize.viewHeight, mapWidth = viewSize.mapWidth, mapHeight = viewSize.mapHeight;
        var mapAPI = this.getMapAPI();
        this.renderBackground = true; // for the first time
        this.levelArea = levelArea;
        this.viewSize = viewSize;
        destroyAllButPlayer();
        this.tileIdxMap = placeLevelTerrainTiles(levelArea.tileMap, viewSize, levelArea.spawnableEnemies);
        var player = placePlayerInLevel(levelArea, this.tileIdxMap);
        placeLevelEntities(levelArea, this.tileIdxMap);
        // set triggers
        var hasStartTriggers = levelArea.triggers.levelStart.length;
        hasStartTriggers && levelArea.triggers.levelStart.forEach(function (configuredTrigger) {
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
    };
    // For editor mode only
    GameLoop.prototype.changeTileType = function (tile, newType) {
        assertType(tile, 'Tile', 'object');
        var _a = tile.tileIdx.split('-'), col = _a[0], row = _a[1];
        var idx = tile.tileIdx;
        this.levelArea.tileMap[row][col] = +newType;
        destroyAllButPlayer();
        this.tileIdxMap = placeLevelTerrainTiles(this.levelArea.tileMap, this.viewSize, this.levelArea.spawnableEnemies);
        this.renderBackground = true; // for the first time
        console.log(JSON.stringify(this.levelArea.tileMap));
    };
    GameLoop.prototype.handleAreaChange = function (level, area) {
        this.onAreaChange(level, area);
    };
    GameLoop.prototype.requestBackgroundRender = function () {
        this.renderBackground = true;
    };
    GameLoop.prototype.notifyBackgroundWasRendered = function () {
        this.renderBackground = false;
    };
    GameLoop.prototype.resume = function () {
        var _this = this;
        if (!this.isRunning) {
            this.isRunning = true;
            this.engine.run(function () {
                return _this.getSystemArguments(_this.getMapAPI, _this.getMinimapAPI);
            });
        }
    };
    GameLoop.prototype.stop = function () {
        this.isRunning = false;
        this.engine.stop();
    };
    GameLoop.prototype.activateTrigger = function (trigger) {
        pushTrigger(trigger);
    };
    /**
     * @param action {Object} - contains, {entityID}
     */
    GameLoop.prototype.dispatchAction = function (action) {
        pushAction(action);
    };
    return GameLoop;
}());
export default GameLoop;
