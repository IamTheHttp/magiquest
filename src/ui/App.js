"use strict";
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
exports.__esModule = true;
var React = require("react");
var dist_1 = require("game-platform/dist");
var Game_1 = require("gameEngine/Game");
var config_1 = require("gameEngine/config");
var registerUserInputEvents_1 = require("ui/utils/registerUserInputEvents");
var levelConfig_1 = require("levels/levelConfig");
var BaseEntity_1 = require("gameEngine/BaseEntity");
var GameCanvas = dist_1["default"].GameCanvas;
var Editor_1 = require("./Editor");
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
            viewHeight: config_1.resolution.height,
            viewWidth: config_1.resolution.width,
            onViewMapClick: function (mouseClickData) {
                mouseClickData.hits.forEach(function (shape) {
                    if (shape.layerName === 'background') {
                        var entityID = shape.id.split('-')[0];
                        var tile = BaseEntity_1.Entity.entities[entityID];
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
        return new Game_1["default"]({
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
                viewHeight: config_1.resolution.height,
                viewWidth: config_1.resolution.width,
                mapHeight: mapHeight,
                mapWidth: mapWidth
            }
        });
    };
    App.prototype.setNewCanvas = function (currentAreaMap) {
        if (this.state.mapAPI) {
            this.state.mapAPI.removeLayer('background');
        }
        var mapWidth = currentAreaMap[0].length * config_1.bit;
        var mapHeight = currentAreaMap.length * config_1.bit;
        // creates the new canvas
        var _a = this.initGameCanvas(mapWidth, mapHeight), map = _a.map, minimap = _a.minimap;
        this.setState({
            map: map,
            minimap: minimap,
            mapHeight: mapHeight,
            mapWidth: mapWidth
        });
    };
    App.prototype.changeMap = function (levelNum, areaNum) {
        this.setState({
            currentLevel: levelNum,
            currentArea: areaNum
        });
        var nextArea = levelConfig_1["default"][levelNum].areas[areaNum];
        var areaTileMap = nextArea.tileMap;
        this.setNewCanvas(areaTileMap);
        var viewSize = {
            viewHeight: config_1.resolution.height,
            viewWidth: config_1.resolution.width,
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
        var areaToLoad = levelConfig_1["default"][levelNum].areas[areaNum];
        var areaTileMap = areaToLoad.tileMap;
        this.setNewCanvas(areaTileMap);
        var mapWidth = areaTileMap[0].length * config_1.bit;
        var mapHeight = areaTileMap.length * config_1.bit;
        // Start the game loop
        setTimeout(function () {
            _this.game = _this.initGameLoop(areaToLoad, mapWidth, mapHeight);
            window.game = _this.game;
            registerUserInputEvents_1["default"](_this.game);
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
            return (<div>
          <button id={'start'} onClick={function () {
                _this.clickToStartGame();
            }}>Start Game
          </button>
        </div>);
        }
        else {
            return (<div>
          <button onClick={function () {
                _this.setState({
                    isEditing: true
                });
            }}>
            Editor
          </button>
          <h1>
            {this.state.currentLevel}-{this.state.currentArea}
          </h1>
          <Editor_1["default"] clickedTileIdx={this.state.clickedTileIdx} onTileSelect={function (tileType) {
                _this.setState({
                    editorTileType: tileType
                });
            }}/>
          <div className='wrapper'>
            <div className='canvas-main-container'>
              {this.state.map}
            </div>
          </div>

          <div className='canvas-minimap-container'>
            {this.state.minimap}
          </div>
        </div>);
        }
    };
    return App;
}(React.Component));
exports["default"] = App;
