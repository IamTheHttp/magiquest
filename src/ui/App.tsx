import * as  React from 'react';
import GAME_PLATFORM from 'game-platform';
import GameLoop from 'gameEngine/Game';
import {bit, resolution, tileTypes} from 'gameEngine/config';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
import levelConfig from 'levels/levelConfig';
import {Entity} from 'gameEngine/BaseEntity';
import Editor from './Editor';
import {ILevelArea, ITileMap} from "../interfaces/levels.i";
import Tile from "entities/Tile";
import saveToServer from "./utils/saveToServer";
import resizeGameElements from "./utils/resizeGameElements";
import {IListenToUIEvents, IPlayerStateChange, IPlayerUIState} from "../interfaces/interfaces";
import GameUI from "./GameUI";
import SkillTree from "./SkillTree";
import {AllowedActions} from "gameConstants";

let {GameCanvas} = GAME_PLATFORM;

type IState = {
  mapCanvasEl: any; // TODO this should not be any
  minimapCanvasEl: any; // TODO this should not be any
  currentLevel: number;
  currentArea: number;
  mapHeight: any; // TODO this should not be any
  mapWidth: any; // TODO this should not be any
  minimap: any; // TODO this should not be any
  map: any; // TODO this should not be any
  active: any; // TODO this should not be any
  isEditing: any; // TODO this should not be any
  gameStarted: any; // TODO this should not be any
  mapAPI: any; // TODO this should not be any
  clickedTileIdx: any; // TODO this should not be any
  editorTileType: number; // TODO this should not be any
  minimapAPI: any; // TODO this should not be any
  playerState: IPlayerUIState,
};


class App extends React.Component<any, IState> {
  game: GameLoop;

  constructor(props: object) {
    super(props);

    this.state = {
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
      minimapAPI: null,
      playerState: {
        maxHealth: 0,
        currentHealth: 0,
        percentHealth: 0,
        showSkillTree: false,
        skills: []
      }
    };

    // This is the 'Player licked play' button
    setTimeout(() => {
      this.clickToStartGame();
      this.resize();
    }, 10);


    window.addEventListener('resize', () => {
      this.resize()
    });
    window.addEventListener('orientationchange', () => {
      this.resize()
    });
  }

  initGameCanvas(mapWidth: number, mapHeight: number): { map: HTMLCanvasElement, minimap: HTMLCanvasElement } {
    return new GameCanvas({
      mapHeight,
      mapWidth,
      viewHeight: resolution.height,
      viewWidth: resolution.width,
      onViewMapClick: (mouseClickData) => {
        // TODO - this should ONLY work in editor mode
        mouseClickData.hits.forEach((shape) => {
          if (shape.layerName === 'background') {
            // We need to get the tile here so we can set the state for clickedTileIdx
            // Ideally this should all be moved internally into game.changeTileType
            let entityID = +shape.id.split('-')[0];
            let tile = Entity.entities[entityID] as Tile; // TODO can we change these 'AS' things?
            if (this.state.editorTileType !== null) {
              let levelArea = this.game.changeTileType(tile, this.state.editorTileType);
              saveToServer(levelArea);
            }
            this.setState({clickedTileIdx: tile.tileIdx});
          }
        });
      }
    }).getNewCanvasPairs({
      getMapRef: (API) => {
        window.API = API;
        API.addLayer('background');
        this.setState({
          mapAPI: API
        });
      },
      getMiniRef: (API) => {
        this.setState({
          minimapAPI: API
        });
      }
    });
  }

  initGameLoop(areaToLoad: ILevelArea, mapWidth: number, mapHeight: number, listenToEvents: IListenToUIEvents) {
    return new GameLoop({
      levelArea: areaToLoad,
      onAreaChange: (level, area) => {
        this.changeMap(level, area);
      },
      getMapAPI: () => {
        return this.state.mapAPI;
      },
      getMinimapAPI: () => {
        return this.state.minimapAPI;
      },
      viewSize: {
        viewHeight: resolution.height,
        viewWidth: resolution.width,
        mapHeight,
        mapWidth
      },
      listenToEvents
    });
  }

  setNewCanvas(currentAreaMap: ITileMap) {
    if (this.state.mapAPI) {
      this.state.mapAPI.removeLayer('background');
    }

    let mapWidth = currentAreaMap[0].length * bit;
    let mapHeight = currentAreaMap.length * bit;

    // creates the new canvas
    let gameCanvas = this.initGameCanvas(mapWidth, mapHeight);

    let {map, minimap} = gameCanvas;

    this.setState({
      map,
      minimap,
      mapHeight,
      mapWidth
    });
  }

  changeMap(levelNum: number, areaNum: number) {
    this.setState({
      currentLevel: levelNum,
      currentArea: areaNum
    });

    let nextArea = levelConfig[levelNum].areas[areaNum];
    let areaTileMap = nextArea.tileMap;
    this.setNewCanvas(areaTileMap);

    let viewSize = {
      viewHeight: resolution.height,
      viewWidth: resolution.width,
      mapHeight: this.state.mapHeight,
      mapWidth: this.state.mapWidth
    };

    this.game.setLevelArea(nextArea, viewSize);
  }

  startGame() {
    // Load some initial state, what level are we on?
    let levelNum = this.state.currentLevel; // this should probably be set every time it changes
    let areaNum = this.state.currentArea;
    // Use the level to get the current map for that level
    let areaToLoad = levelConfig[levelNum].areas[areaNum] as ILevelArea;
    let areaTileMap = areaToLoad.tileMap;
    this.setNewCanvas(areaTileMap);

    let mapWidth = areaTileMap[0].length * bit;
    let mapHeight = areaTileMap.length * bit;
    // Start the game loop
    setTimeout(() => {
      this.game = this.initGameLoop(areaToLoad, mapWidth, mapHeight, (event) => {
        let newPlayerState = Object.assign({}, this.state.playerState, {
          maxHealth: event.maxHealth,
          currentHealth: event.currentHealth,
          percentHealth: event.percentHealth,
          skills: event.skills
        });

        this.setState({
          playerState: newPlayerState
        })
      });

      window.game = this.game;
      registerUserInputEvents(this.game);
    }, 0);
  }


  clickToStartGame() {
    this.startGame();
    this.setState({
      gameStarted: true
    });
  }


  resize() {
    resizeGameElements(this.state.isEditing);
  }

  toggleShowSkillTree() {
    let playerState = {
      ...this.state.playerState
    };

    playerState.showSkillTree = !playerState.showSkillTree;

    this.setState({
      playerState
    });
  }

  render() {
    if (!this.state.gameStarted) {
      return (
        <div>
          <button
            id={'start'}
            onClick={() => {
              this.clickToStartGame();
            }}
          >Start Game
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            id="toggle-editor"
            onClick={() => {
              this.setState({
                isEditing: !this.state.isEditing
              });
            }}
          >
            Editor
          </button>
          {this.state.isEditing && <Editor
            clickedTileIdx={this.state.clickedTileIdx}
            currentLevel={this.state.currentLevel}
            currentArea={this.state.currentArea}
            onTileSelect={(tileType) => {
              this.setState({
                editorTileType: tileType
              });
            }}
            onLevelAreaNav={(level, area) => {
              this.changeMap(level, area);
              // we're re-writing the canvas, so we need to delay to next tick
              setTimeout(() => {
                this.game.centerOnPlayer();
              }, 0);
            }}
            onPosNav={(col, row) => {
              this.game.setPlayerPosition(col, row);
            }}
          />}
          <GameUI
            {...this.state.playerState}
            onShowSkillsClicked={() => { this.toggleShowSkillTree() }}
          />
          {this.state.playerState.showSkillTree && <SkillTree
            currentPlayerState={{...this.state.playerState}}
            onCloseSkillTree={() => {this.toggleShowSkillTree()}}
            onSkillClick={(skillID) => {
              this.game.dispatchAction({
                name: AllowedActions.BUY_SKILL,
                data: {
                  skillID
                }
              });
            }}
          />}
          <div
            className='wrapper'
          >
            <div
              className='canvas-main-container'>
              {this.state.map}
            </div>
          </div>

          <div className='canvas-minimap-container'>
            {this.state.minimap}
          </div>
        </div>
      );
    }
  }
}


export default App;