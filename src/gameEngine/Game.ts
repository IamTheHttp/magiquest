import {IZone, ITileCoordinate} from '../interfaces/IZones';
import {Engine, Entity} from 'game-platform';
import assertType from './utils/assertType';
import createTileIndexMap from './utils/createTileIndexMap';
import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  HEALTH_COMP,
  PLAYER_CONTROLLED_COMP,
  POSITION_COMP,
  UI_COMP
} from './components/ComponentNamesConfig';
import {IAction, IGameEventListener, ITileIndexMap, IViewSize} from '../interfaces/IGeneral';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';
import triggerSystem, {pushTrigger, Trigger} from './systems/triggerSystem';
import renderSystem from './systems/renderSystem';
import Player from './entities/characters/Player';
import GameEvents, {
  EnemyKilledEvent,
  PlayerAttributesChangeEvent,
  PlayerIsAttacked,
  PlayerSkillsChangeEvent
} from './classes/GameEvents';
import {assetLoader} from '../utils/assetLoader';
import placePlayerInLevel from './utils/placePlayerInLevel';
import animationSystem from './systems/animationSystem';
import aiSystem from './systems/aiSystem';
import portalSystem, {isNonEmptyArray} from './systems/portalSystem';
import throttle from './utils/throttle';
import getColRowByTileIdx from './utils/getColRowByTileIdx';
import centerCameraOnEntity from './utils/systemUtils/centerCameraOnEntity';
import questSystem from './systems/questSystem';
import destroyAllButPlayer from './utils/destroyAllButPlayer';
import {ISystemArguments} from '../interfaces/IGameLoop';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import spawnEnemiesSystem from './systems/spawnEnemiesSystem';
import attackSystem from './systems/attackSystem';
import {BaseEntity} from './BaseEntity';
import {PlayerStateChangeEvent} from './classes/PlayerState';
import experienceSystem from './systems/experienceSystem';
import moveSystem from './systems/moveSystem';
import placeLevelEntities from './utils/placeLevelEntities';
import {
  TILE_SIZE,
  CHAR_SPRITE_URL,
  RESOLUTION,
  TILESET_IMAGE_URL,
  CANVAS_OUTPUT,
  AllowedUIShapes
} from './gameConstants';
import {IGameConstructor, onZoneChangeCallback} from './IGameTypes';
import {zoneConfig} from '../data/zones/zoneConfig';
import {editorInputSystem, pushEditorAction} from './systems/editorInputSystem';
import PositionComponent from './components/PositionComponent';
import UIComponent from './components/UIComponent';

class Game {
  engine: Engine;
  mode: 'editing' | 'playing';
  mapAPI: Painter;
  miniMapAPI: Painter;
  onZoneChange: onZoneChangeCallback;
  tileIdxMap: ITileIndexMap;
  viewSize: IViewSize;
  zone: IZone;
  renderBackground: boolean;
  isRunning: boolean;
  gameEvents: GameEvents;
  gameEventListener: IGameEventListener;
  currentChapter: number;
  currentAct: number;

  constructor({onZoneChange, mode = 'editing'}: IGameConstructor) {
    Entity.reset();
    this.dispatchAction = this.dispatchAction.bind(this);

    let engine = new Engine();
    this.mode = mode;
    this.engine = engine;
    this.onZoneChange = onZoneChange;
    this.gameEvents = new GameEvents();

    // TODO this probably needs to be related to player movement speed
    // this should also probably be refactored out
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 100);

    if (mode === 'editing') {
      engine.addSystem(editorInputSystem);
    } else {
      engine.addSystem(userInputSystem);
    }

    if (mode === 'playing') {
      engine.addSystem(animationSystem);
      engine.addSystem(triggerSystem);
      engine.addSystem(spawnEnemiesSystem);
      engine.addSystem(aiSystem);
      engine.addSystem(portalSystem);
      engine.addSystem(moveSystem);
      engine.addSystem(attackSystem);
      engine.addSystem(questSystem);
      engine.addSystem(experienceSystem);
    }

    engine.addSystem(renderSystem);

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
   * Create an entity to represent the player starting position
   * This function is only called from the Editor
   */
  highlightStartPosition() {
    if (this.mode !== 'editing') {
      throw 'Calling highlightStartPosition from outside the editor is not allowed';
    }

    const startPosEntity = new BaseEntity(null);

    const {x, y} = this.getZoneStartXY();
    startPosEntity.addComponent(
      new PositionComponent({
        x,
        y,
        radius: 0.5 * TILE_SIZE
      })
    );

    startPosEntity.addComponent(
      new UIComponent([
        {
          name: CANVAS_OUTPUT,
          shape: AllowedUIShapes.CIRCLE_SHAPE,
          data: {
            fillColor: 'lime'
          }
        }
      ])
    );
  }

  /**
   * Returns the zone's tilemap basd on the current game's act and chapter
   * TODO Implement error handling - what happens when we request a tilemap of an chapter that doesn't exist?
   */
  getZone() {
    return zoneConfig[this.currentAct].chapters[this.currentChapter] as IZone;
  }

  getZoneStartXY(): {x: number; y: number} {
    return {
      x: this.getZone().playerStartPos.col * TILE_SIZE + 0.5 * TILE_SIZE,
      y: this.getZone().playerStartPos.row * TILE_SIZE + 0.5 * TILE_SIZE
    };
  }

  /**
   * Sets the state for the desired act and chapter
   * used before loadCurrentZone() to load the specific zone
   * @param actNum
   * @param chapterNum
   */
  setZoneByActAndChapter(actNum: number, chapterNum: number) {
    // Set the game state of the current act and chapter
    this.currentAct = actNum;
    this.currentChapter = chapterNum;
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
    let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
    player.setPos({
      x: TILE_SIZE / 2 + col * TILE_SIZE,
      y: TILE_SIZE / 2 + row * TILE_SIZE
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

  /**
   * Set up the current zone of the game
   * This function is responsible for:
   * - Wiping the old zone state (removeAllButPlayer)
   * - Creating all the entities of the zone
   * - Creating all the triggers in the zone
   * @param playerStartingTile
   */
  loadCurrentZone({playerStartingTile = null}: {playerStartingTile?: ITileCoordinate}) {
    if (!this.mapAPI) {
      throw 'Cannot load the current zone without a mapAPI instance';
    }

    let mapAPI = this.mapAPI;

    const zone = this.getZone();
    const {tileMap} = zone;

    let mapWidth = tileMap[0].length * TILE_SIZE;
    let mapHeight = tileMap.length * TILE_SIZE;

    this.renderBackground = true; // for the first time
    this.zone = zone;
    this.viewSize = {
      viewHeight: RESOLUTION.height,
      viewWidth: RESOLUTION.width,
      mapHeight: mapHeight,
      mapWidth: mapWidth
    };

    destroyAllButPlayer(); // TODO if we plan to have a single world, this is a problem :)
    this.tileIdxMap = createTileIndexMap(zone, this.viewSize);

    if (this.mode === 'editing') {
      this.highlightStartPosition();
    }

    // only out of editor mode, when playing
    if (this.mode === 'playing') {
      let player = placePlayerInLevel(zone, this.tileIdxMap, playerStartingTile);
      placeLevelEntities(zone, this.tileIdxMap);

      // set triggers
      // For editor, skip triggers
      if (isNonEmptyArray(zone.triggers.levelStart)) {
        zone.triggers.levelStart.forEach((configuredTrigger) => {
          // activateTrigger ...
          if (configuredTrigger.type === 'dialog') {
            pushTrigger(
              new Trigger({
                type: 'dialog',
                lines: configuredTrigger.lines,
                actedOnEntity: player
              })
            );
          }
        });
      }

      // Reset panning
      this.mapAPI.panCamera(0, 0);

      centerCameraOnEntity(
        player,
        mapAPI,
        this,
        this.viewSize.viewWidth,
        this.viewSize.viewHeight,
        mapWidth,
        mapHeight,
        true
      );

      // New level means new background
      this.requestBackgroundRender();
    }
    this.renderBackground = true; // for the first time
  }

  /**
   * This function allows the UI to send messages to the game, requesting certain actions
   * This can be replaced in the future with a generic event bus that both the game and the UI will use.
   * @param msg {string}
   */
  notifyGame(msg: string) {
    // When the UI is ready, dispatch a player state event.
    // Do not dispatch this event in editor mode
    if (msg === 'UI_READY' && this.mode === 'playing') {
      this.dispatchGameEvent(this.getPlayerStateEvent());
    }
  }

  handleZoneChange(act: number, chapter: number, newPlayerPosition: ITileCoordinate) {
    // Trigger a level change, request a background change as all the scene is different
    this.setZoneByActAndChapter(act, chapter);
    this.loadCurrentZone({playerStartingTile: newPlayerPosition});

    // fire event in case anyone is listening
    this.onZoneChange(act, chapter, newPlayerPosition);
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
      attributes: player[CHARACTER_ATTRIBUTES_COMP].attributes,
      spendableAttributePoints: player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints
    });
  }

  // TODO trigger vs Action vs GameEvent vs UIEvent - Oh My.
  // Action - Incoming action from the UI. TODO maybe rename to playerAction or userAction or inputEvent
  // GameEvent is relatively clear, an event originated from the game.
  // UIEvent - An event dispatched from the game, to the UI
  // trigger - Triggers game logic within the game (trigger system)
  dispatchAction(action: IAction) {
    if (this.mode === 'playing') {
      pushAction(action);
    } else if (this.mode === 'editing') {
      pushEditorAction(action);
    } else {
      throw 'No game mode selected - cannot dispatch action';
    }
  }
}

export default Game;
