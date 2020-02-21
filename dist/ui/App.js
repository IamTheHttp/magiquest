var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import GAME_PLATFORM from 'game-platform/dist';
import GameLoop from 'gameEngine/Game';
import { bit, resolution } from 'gameEngine/config';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
import levelConfig from 'levels/levelConfig';
import { Entity } from 'gameEngine/BaseEntity';
import Editor from './Editor';
var GameCanvas = GAME_PLATFORM.GameCanvas;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mapCanvasEl: null,
            minimapCanvasEl: null,
            currentLevel: 0,
            currentArea: 0,
            mapHeight: null,
            mapWidth: null,
            minimap: null,
            map: null,
            active: null,
            isEditing: null,
            gameStarted: null,
            mapAPI: null,
            clickedTileIdx: null,
            editorTileType: null,
            minimapAPI: null
        };
        setTimeout(function () {
            _this.clickToStartGame();
        }, 10);
        return _this;
    }
    App.prototype.initGameCanvas = function (mapWidth, mapHeight) {
        var _this = this;
        return new GameCanvas({
            mapHeight: mapHeight,
            mapWidth: mapWidth,
            viewHeight: resolution.height,
            viewWidth: resolution.width,
            onViewMapClick: function (mouseClickData) {
                mouseClickData.hits.forEach(function (shape) {
                    if (shape.layerName === 'background') {
                        var entityID = shape.id.split('-')[0];
                        var tile = Entity.entities[entityID];
                        if (_this.state.editorTileType) {
                            _this.game.changeTileType(tile, _this.state.editorTileType);
                        }
                        _this.setState({ clickedTileIdx: tile.tileIdx });
                        // this is what was clicked.
                        // what we want to do is set THIS col/row to be the tileType that's currently selected.
                        // TODO - this should ONLY work in editor mode
                    }
                });
            }
        }).getNewCanvasPairs({
            getMapRef: function (API, el) {
                window.API = API;
                API.addLayer('background');
                _this.setState({
                    mapAPI: API
                });
            },
            getMiniRef: function (API, el) {
                _this.setState({
                    minimapAPI: API
                });
            }
        });
    };
    App.prototype.initGameLoop = function (areaToLoad, mapWidth, mapHeight) {
        var _this = this;
        return new GameLoop({
            levelArea: areaToLoad,
            onAreaChange: function (level, area) {
                _this.changeMap(level, area);
            },
            getMapAPI: function () {
                return _this.state.mapAPI;
            },
            getMinimapAPI: function () {
                return _this.state.minimapAPI;
            },
            viewSize: {
                viewHeight: resolution.height,
                viewWidth: resolution.width,
                mapHeight: mapHeight,
                mapWidth: mapWidth
            }
        });
    };
    App.prototype.setNewCanvas = function (currentAreaMap) {
        if (this.state.mapAPI) {
            this.state.mapAPI.removeLayer('background');
        }
        var mapWidth = currentAreaMap[0].length * bit;
        var mapHeight = currentAreaMap.length * bit;
        // creates the new canvas
        var gameCanvas = this.initGameCanvas(mapWidth, mapHeight);
        var viewMapCanvas = gameCanvas.viewMapCanvas, miniMapCanvas = gameCanvas.miniMapCanvas;
        this.setState({
            map: viewMapCanvas,
            minimap: miniMapCanvas,
            mapHeight: mapHeight,
            mapWidth: mapWidth
        });
    };
    App.prototype.changeMap = function (levelNum, areaNum) {
        this.setState({
            currentLevel: levelNum,
            currentArea: areaNum
        });
        var nextArea = levelConfig[levelNum].areas[areaNum];
        var areaTileMap = nextArea.tileMap;
        this.setNewCanvas(areaTileMap);
        var viewSize = {
            viewHeight: resolution.height,
            viewWidth: resolution.width,
            mapHeight: this.state.mapHeight,
            mapWidth: this.state.mapWidth
        };
        this.game.setLevelArea(nextArea, viewSize);
    };
    App.prototype.startGame = function () {
        var _this = this;
        // Load some initial state, what level are we on?
        var levelNum = this.state.currentLevel; // this should probably be set every time it changes
        var areaNum = this.state.currentArea;
        // Use the level to get the current map for that level
        var areaToLoad = levelConfig[levelNum].areas[areaNum];
        var areaTileMap = areaToLoad.tileMap;
        this.setNewCanvas(areaTileMap);
        var mapWidth = areaTileMap[0].length * bit;
        var mapHeight = areaTileMap.length * bit;
        // Start the game loop
        setTimeout(function () {
            _this.game = _this.initGameLoop(areaToLoad, mapWidth, mapHeight);
            window.game = _this.game;
            registerUserInputEvents(_this.game);
        }, 0);
    };
    App.prototype.clickToStartGame = function () {
        this.startGame();
        this.setState({
            gameStarted: true
        });
    };
    App.prototype.render = function () {
        var _this = this;
        if (!this.state.gameStarted) {
            return (React.createElement("div", null,
                React.createElement("button", { id: 'start', onClick: function () {
                        _this.clickToStartGame();
                    } }, "Start Game")));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("button", { onClick: function () {
                        _this.setState({
                            isEditing: true
                        });
                    } }, "Editor"),
                React.createElement("h1", null,
                    this.state.currentLevel,
                    "-",
                    this.state.currentArea),
                React.createElement(Editor, { clickedTileIdx: this.state.clickedTileIdx, onTileSelect: function (tileType) {
                        _this.setState({
                            editorTileType: tileType
                        });
                    } }),
                React.createElement("div", { className: 'wrapper' },
                    React.createElement("div", { className: 'canvas-main-container' }, this.state.map)),
                React.createElement("div", { className: 'canvas-minimap-container' }, this.state.minimap)));
        }
    };
    return App;
}(React.Component));
export default App;
