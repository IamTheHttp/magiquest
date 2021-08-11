import * as  React from 'react';
import GameLoop from 'gameEngine/Game';
// import {bit, resolution, tileTypes} from 'gameEngine/config';
import registerUserInputEvents from 'ui/utils/registerUserInputEvents';
import levelConfig from 'levels/levelConfig';
import Editor from './Editor';
import {ILevelArea, ITileCoordinate, ITileMap} from "../interfaces/levels.i";
import saveToServer from "./utils/saveToServer";
import resizeGameElements from "./utils/resizeGameElements";
import {IGameEventListener, IPlayerUIState} from "../interfaces/interfaces";
import GameUI from "./Components/GameUI/GameUI";
import SkillTree from "./Components/SkillTree/SkillTree";
import {AllowedAttributes} from "data/attributesConfig";
import Attributes from "./Components/Attributes/Attributes";
import {ReactElement} from "react";
import {Entity, GameCanvas} from "game-platform";
import {PlayerState} from "../gameEngine/classes/PlayerState";
import {AllowedActions, bit, RESOLUTION} from "../gameEngine/gameConstants";
import {BaseEntity} from "../gameEngine/BaseEntity";
import Tile from "../gameEngine/entities/Tile";


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
  debug: {
    countOfEnemyEntities: number,
    countOfTileEntities: number
  }
  playerState: IPlayerUIState,
};


class App extends React.Component<any, IState> {
  game: GameLoop;

  constructor(props: object) {
    super(props);

    setInterval(() => {
      this.setState({
        debug: {
          countOfEnemyEntities: Entity.getByComp<BaseEntity>('AI_CONTROLLED_COMP').length,
          countOfTileEntities: Entity.getByComp<BaseEntity>('TRAVERSABLE_COMP').length
        }
      })
    }, 1000);

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
      debug: {
        countOfEnemyEntities:0,
        countOfTileEntities:0
      },
      playerState: {
        maxHealth: 0,
        currentHealth: 0,
        percentHealth: 0,
        showSkillTree: false,
        showAttributes: false,
        skills: [],
        spendableXP: 0, // TODO this is just XP, refactor the name 'spendable'
        levelProgress: 0,
        spendableAttributePoints: 0,
        attributes: {
          [AllowedAttributes.AGILITY]: 0, // assigned when game starts by game event
          [AllowedAttributes.STRENGTH]: 0, // assigned when game starts by game event
          [AllowedAttributes.WILL]: 0, // assigned when game starts by game event
          [AllowedAttributes.ENDURANCE]: 0 // assigned when game starts by game event
        }}
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

  initGameCanvas(mapWidth: number, mapHeight: number): { map: ReactElement<HTMLCanvasElement>, minimap: ReactElement<HTMLCanvasElement> } {
    return new GameCanvas({
      mapHeight,
      mapWidth,
      viewHeight: RESOLUTION.height,
      viewWidth: RESOLUTION.width,
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

  changeMap(levelNum: number, areaNum: number, targetTile:ITileCoordinate = null) {
    this.setState({
      currentLevel: levelNum,
      currentArea: areaNum
    });

    let nextArea = levelConfig[levelNum].areas[areaNum];
    console.log('level conf', levelConfig);
    let areaTileMap = nextArea.tileMap;
    this.setNewCanvas(areaTileMap);

    let viewSize = {
      viewHeight: RESOLUTION.height,
      viewWidth: RESOLUTION.width,
      mapHeight: this.state.mapHeight,
      mapWidth: this.state.mapWidth
    };

    this.game.setLevelArea(nextArea, viewSize, targetTile);
  }

  startGame() {
    // Load some initial state, what level are we on?
    let levelNum = this.state.currentLevel; // this should probably be set every time it changes
    let areaNum = this.state.currentArea;
    // Use the level to get the current map for that level
    let areaToLoad = levelConfig[levelNum].areas[areaNum] as ILevelArea;
    console.log('level Conf', levelConfig);
    let areaTileMap = areaToLoad.tileMap;
    this.setNewCanvas(areaTileMap);

    let mapWidth = areaTileMap[0].length * bit;
    let mapHeight = areaTileMap.length * bit;
    // Start the game loop
    setTimeout(() => {
      this.game = new GameLoop({
        levelArea: areaToLoad,
        onAreaChange: (level, area, newPlayerPosition) => {
          this.changeMap(level, area, newPlayerPosition);
        },
        getMapAPI: () => {
          return this.state.mapAPI;
        },
        getMinimapAPI: () => {
          return this.state.minimapAPI;
        },
        viewSize: {
          viewHeight: RESOLUTION.height,
          viewWidth: RESOLUTION.width,
          mapHeight,
          mapWidth
        },
        gameEventListener: (event) => {
          let newPlayerState:PlayerState = {
            maxHealth: event.maxHealth,
            currentHealth: event.currentHealth,
            percentHealth: event.percentHealth,
            skills: event.skills,
            spendableXP: event.spendableXP,
            levelProgress: event.levelProgress,
            attributes: event.attributes,
            spendableAttributePoints: event.spendableAttributePoints
          };

          this.setState({
            playerState: Object.assign({}, this.state.playerState, newPlayerState)
          })
        }
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

  toggleUIPlayerState(stateKey: 'showAttributes' | 'showSkillTree') {
    let playerState = {
      ...this.state.playerState
    };

    playerState[stateKey] = !playerState[stateKey];

    this.setState({
      playerState
    });
  }

  render() {
    const showSkillTree = this.state.playerState.showSkillTree;
    const showAttributes = this.state.playerState.showAttributes;
    const isGameStarted = this.state.gameStarted;
    const isEditing = this.state.isEditing;

    if (!isGameStarted) {
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
          <div style={{position:'absolute', bottom:0, right:0, zIndex:100 }}>
            <div>Enemies: {this.state.debug.countOfEnemyEntities}</div>
            <div>Tiles: {this.state.debug.countOfTileEntities}</div>
          </div>
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
          {isEditing && <Editor
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
            onShowSkillsClicked={() => { this.toggleUIPlayerState('showSkillTree') }}
            onShowAttributes={() => { this.toggleUIPlayerState('showAttributes') }}
          />
          {showSkillTree && <SkillTree
            currentPlayerState={{...this.state.playerState}}
            onCloseSkillTree={() => {this.toggleUIPlayerState('showSkillTree')}}
            onBuySkillClick={(skillID) => {
              this.game.dispatchAction({
                name: AllowedActions.BUY_SKILL,
                data: {
                  skillID
                }
              });
            }}
          />}

          {showAttributes && <Attributes
            currentPlayerState={{...this.state.playerState}}
            onCloseAttributes={() => {this.toggleUIPlayerState('showAttributes')}}
            onBuyAttributeClick={(attrID) => {
              this.game.dispatchAction({
                name: AllowedActions.BUY_ATTR,
                data: {
                  attrID
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