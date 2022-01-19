import {IZone, ITileCoordinate} from "../../interfaces/levels.i";
import {Engine, Entity} from "game-platform";
import assertType from "../utils/assertType";
import createTileIndexMap from "../utils/createTileIndexMap";
import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  HEALTH_COMP,
  PLAYER_CONTROLLED_COMP
} from "../components/ComponentNamesConfig";
import {IAction, IGameEventListener, ITileIndexMap, IViewSize} from "../../interfaces/interfaces";
import {Painter} from "game-platform/dist/lib/PainterAPI/Painter";
import triggerSystem, {pushTrigger, Trigger} from "../systems/triggerSystem";
import renderSystem from "../systems/renderSystem";
import Player from "../entities/characters/Player";
import GameEvents, {
  EnemyKilledEvent,
  PlayerAttributesChangeEvent,
  PlayerIsAttacked,
  PlayerSkillsChangeEvent
} from "../classes/GameEvents";
import {assetLoader} from "../../cache/assetLoader";
import placePlayerInLevel from "../utils/placePlayerInLevel";
import animationSystem from "../systems/animationSystem";
import aiSystem from "../systems/aiSystem";
import portalSystem, {isNonEmptyArray} from "../systems/portalSystem";
import throttle from "../utils/throttle";
import getColRowByTileIdx from "../utils/getColRowByTileIdx";
import centerCameraOnEntity from "../utils/systemUtils/centerCameraOnEntity";
import questSystem from "../systems/questSystem";
import destroyAllButPlayer from "../utils/destroyAllButPlayer";
import {ISystemArguments} from "../../interfaces/gameloop.i";
import userInputSystem, {pushAction} from "../systems/userInputSystem";
import spawnEnemiesSystem from "../systems/spawnEnemiesSystem";
import attackSystem from "../systems/attackSystem";
import {BaseEntity} from "../BaseEntity";
import {PlayerStateChangeEvent} from "../classes/PlayerState";
import Tile from "../entities/Tile";
import experienceSystem from "../systems/experienceSystem";
import moveSystem from "../systems/moveSystem";
import placeLevelEntities from "../utils/placeLevelEntities";
import {bit, CHAR_SPRITE_URL, RESOLUTION, TILESET_IMAGE_URL} from "../gameConstants";
import {getCanvasAPICallback, IGameConstructor, onAreaChangeCallback} from "./IGameTypes";
import levelConfig from "../../levels/levelConfig";


class Game {
  engine:Engine;
  mapAPI: Painter;
  miniMapAPI: Painter;
  onAreaChange: onAreaChangeCallback;
  tileIdxMap: ITileIndexMap;
  viewSize: IViewSize;
  zone:IZone;
  renderBackground:boolean;
  isRunning: boolean;
  gameEvents: GameEvents;
  gameEventListener: IGameEventListener;

  // Player's current area TODO this is a placeholder
  currentArea: number;
  // Player's current level TODO this is a placeholder
  currentLevel: number;

  constructor({onAreaChange}: IGameConstructor) {
    Entity.reset();
    this.dispatchAction = this.dispatchAction.bind(this);

    let engine = new Engine();
    this.engine = engine;
    this.onAreaChange = onAreaChange;
    this.gameEvents = new GameEvents();

    // TODO this probably needs to be related to player movement speed
    // this should also probably be refactored out
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 100);


    engine.addSystem(userInputSystem);
    engine.addSystem(triggerSystem);
    engine.addSystem(spawnEnemiesSystem);
    engine.addSystem(moveSystem);
    engine.addSystem(aiSystem);
    engine.addSystem(attackSystem);
    engine.addSystem(renderSystem);
    engine.addSystem(animationSystem);
    engine.addSystem(portalSystem);
    engine.addSystem(questSystem);
    engine.addSystem(experienceSystem);

    // DestroyEntity system
    // TODO export to a system file
    engine.addSystem((systemArguments: ISystemArguments) => {
      let {gameEvents} = systemArguments;
      let hasEvents = gameEvents.getEvents().length > 0;
      gameEvents.getEvents().forEach((event) => {
        if (event instanceof EnemyKilledEvent) {
          event.readEvent().entity.destroy();
        }
      });

      if (hasEvents) {
        this.dispatchGameEvent(this.getPlayerStateEvent());
      }
    });

    // End Tick system
    // TODO export to a system file
    engine.addSystem((systemArguments: ISystemArguments) => {
      let {gameEvents} = systemArguments;
      //notify UI (App.tsx) of certain events

      gameEvents.getEvents().forEach((event) => {
        // TODO, do we want a more general 'NotifyUISystem' event?
        // TODO this feels too specific :)
        // TODO rename PlayerIsAttacked to PlayerIsAttackedEvent
        if (
          event instanceof PlayerIsAttacked ||
          event instanceof PlayerSkillsChangeEvent ||
          event instanceof PlayerAttributesChangeEvent
        ) {
          this.dispatchGameEvent(this.getPlayerStateEvent());
        }
      });

      // throw away old events, create a new empty list
      this.gameEvents.endTick();
    });

    // this.dispatchGameEvent(this.getPlayerStateEvent());
  }

  /**
   * Returns the area's tilemap basd on the current game's level and area
   * TODO Implement error handling - what happens when we request a tilemap of an area that doesn't exist?
   */
  getZone() {
    let levelNum = this.currentLevel
    let areaNum = this.currentArea
    // Use the level to get the current map for that level
    let areaToLoad = levelConfig[levelNum].areas[areaNum] as IZone;
    return areaToLoad;
  }

  /**
   * Sets the state for the desired level and area
   * Populates the internal game state for the currentLevel, Area, mapHeight and mapWidth
   * @param levelNum
   * @param areaNum
   */
  setLevelAndArea(levelNum:number, areaNum:number) {
    // Set the game state of the current level and area
    this.currentLevel = levelNum;
    this.currentArea   = areaNum;
  }

  dispatchGameEvent(event: PlayerStateChangeEvent) {
    this.gameEventListener(event);
  }

  setGameEventListener(listener: IGameEventListener) {
    this.gameEventListener = listener;
  }



  setMapAPI(mapAPI: Painter) {
    this.mapAPI = mapAPI;
    mapAPI.addLayer('background');
  }

  getSystemArguments(mapAPI: Painter, miniMapAPI: Painter): ISystemArguments {
    return {
      tileIdxMap: this.tileIdxMap,
      zone: this.zone,
      tileSetSprite: assetLoader.getAsset(TILESET_IMAGE_URL),
      characterSprite: assetLoader.getAsset(CHAR_SPRITE_URL),
      Entity,
      viewSize: this.viewSize,
      shouldRenderBackground: this.renderBackground,
      game: this,
      mapAPI: mapAPI,
      minimapAPI: miniMapAPI,
      gameEvents: this.gameEvents
    };
  }

  // TODO this is for development/ EDITOR mode only!
  setPlayerPosition(col: number, row: number) {
    console.log('Setting player position', col, row);
    let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
    player.setPos({
      x: bit/2 + col * bit,
      y: bit/2 + row * bit
    });

    this.centerOnPlayer();
  }

  // TODO this is for development/ EDITOR mode only!
  centerOnPlayer() {
    let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];

    this.renderBackground = true; // for the first time

    if (this.mapAPI) {
      let mapAPI = this.mapAPI;
      let {viewWidth, viewHeight, mapWidth, mapHeight} = this.viewSize;

      centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
    }
  }

  loadCurrentLevelArea(playerStartingTile:ITileCoordinate = null) {
    if (!this.mapAPI) {
      throw 'Cannot load the current level area without a mapAPI instance';
    }
    // New level means new background
    this.requestBackgroundRender();

    let mapAPI = this.mapAPI;

    const zone = this.getZone();
    const {tileMap} = zone;

    let mapWidth = tileMap[0].length * bit;
    let mapHeight = tileMap.length * bit;

    this.renderBackground = true; // for the first time
    this.zone = zone;
    this.viewSize = {
      viewHeight: RESOLUTION.height,
      viewWidth: RESOLUTION.width,
      mapHeight: mapHeight,
      mapWidth: mapWidth
    }

    destroyAllButPlayer(); // TODO if we plan to have a single world, this is a problem :)
    this.tileIdxMap = createTileIndexMap(zone, this.viewSize);

    let player = placePlayerInLevel(zone, this.tileIdxMap, playerStartingTile);
    placeLevelEntities(zone, this.tileIdxMap);

    // set triggers
    if (isNonEmptyArray(zone.triggers.levelStart)) {
      zone.triggers.levelStart.forEach((configuredTrigger) => {
        // activateTrigger ...
        if (configuredTrigger.type === 'dialog') {
          pushTrigger(new Trigger({
            type: 'dialog',
            lines: configuredTrigger.lines,
            actedOnEntity: player
          }));
        }
      });
    }

    centerCameraOnEntity(player, mapAPI, this, this.viewSize.viewWidth, this.viewSize.viewHeight, mapWidth, mapHeight, true);
    this.renderBackground = true; // for the first time
  }

  // TODO - EDITOR MODE ONLY
  changeTileType(tile: Tile, newType: number): IZone {
    assertType(tile, 'Tile', 'object');

    tile.setTileType(newType);

    // levelArea.tileMap[row][col], this the RAW json that creates the level - this is what we want to save after..
    let {col, row} = getColRowByTileIdx(tile.tileIdx);
    this.zone.tileMap[row][col] = +newType;

    this.renderBackground = true; // for the first time
    return this.zone;
  }

  handleAreaChange(level: number, area: number, newPlayerPosition: ITileCoordinate) {
    // Trigger a level change, request a background change as all the scene is different
    this.setLevelAndArea(level, area);
    this.loadCurrentLevelArea(newPlayerPosition);

    // fire event in case anyone is listening
    this.onAreaChange(level, area, newPlayerPosition);
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
        return this.getSystemArguments(this.mapAPI, this.miniMapAPI);
      });
    }
  }

  stop() {
    this.isRunning = false;
    this.engine.stop();
  }

  activateTrigger(trigger: Trigger) {
    pushTrigger(trigger);
  }

  getPlayerStateEvent(): PlayerStateChangeEvent {
    const player = Entity.getByComp<Player>(PLAYER_CONTROLLED_COMP)[0];
    return new PlayerStateChangeEvent({
      maxHealth: player[HEALTH_COMP].max,
      currentHealth: player[HEALTH_COMP].current,
      percentHealth: player[HEALTH_COMP].current / player[HEALTH_COMP].max,
      skills: [...player[CHARACTER_SKILLS_COMP].skills],
      spendableXP: player[EXPERIENCE_COMP].XP,
      levelProgress: player[EXPERIENCE_COMP].getLevelProgress(),
      attributes : player[CHARACTER_ATTRIBUTES_COMP].attributes,
      spendableAttributePoints : player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints
    });
  }


  // TODO trigger vs Action vs GameEvent vs UIEvent - Oh My.
  // Action - Incoming action from the UI. TODO maybe rename to playerAction or userAction or inputEvent
  // GameEvent is relatively clear, an event originated from the game.
  // UIEvent - An event dispatched from the game, to the UI
  // trigger - Triggers game logic within the game (trigger system)
  dispatchAction(action: IAction) {
    pushAction(action);
  }
}


export default Game;