import {IZone, ITileCoordinate} from '../interfaces/IZones';
import {Engine, Entity} from 'game-platform';
import createTileIndexMap from './utils/createTileIndexMap';
import {EXPERIENCE, HEALTH, PLAYER_CONTROLLED} from './components/_ComponentNames';
import {IAction, IGameEventListener, IIndexedTileMap, IViewSize} from '../interfaces/IGeneral';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';
import triggerSystem, {DialogTrigger, pushTrigger} from './systems/triggerSystem';
import renderSystem from './systems/renderSystem';
import Player from './entities/placeableEntities/Player';
import GameEvents from './classes/GameEvents';
import placePlayerInLevel from './utils/placePlayerInLevel';
import animationSystem from './systems/animationSystem';
import aiSystem from './systems/aiSystem';
import portalSystem, {isNonEmptyArray} from './systems/portalSystem';
import throttle from './utils/throttle';
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
import {TILE_SIZE, RESOLUTION, CANVAS_OUTPUT, PossibleUIShapes, PLACEABLE_ENTITIES} from './gameConstants';
import {IGameConstructor, onZoneChangeCallback} from './IGameTypes';
import {zoneConfig} from '../data/zones/zoneConfig';
import {editorInputSystem, pushEditorAction} from './systems/editorInputSystem';
import Position from './components/Position';
import HasUI from './components/HasUI';
import {IPlaceableEntityDataMap} from '../interfaces/IPlaceableEntityData';
import {getSprites} from './getSprites';
import {destroyEntitiesSystem} from './systems/destroyEntitySystem';
import {endTickSystem} from './systems/endTickSystem';
import {dropItemSystem} from './systems/dropItemSystem';

class Game {
  engine: Engine;
  mode: 'editing' | 'playing';
  mapAPI: Painter;
  miniMapAPI: Painter;
  onZoneChange: onZoneChangeCallback;
  indexedTileMap: IIndexedTileMap;
  viewSize: IViewSize;
  zone: IZone;
  renderBackground: boolean;
  isRunning: boolean;
  gameEvents: GameEvents;
  gameEventListener: IGameEventListener;
  currentChapter: number;
  currentAct: number;
  placeableEntityDataMap: IPlaceableEntityDataMap;

  constructor({onZoneChange, mode = 'editing', placeableEntityDataMap}: IGameConstructor) {
    Entity.reset();
    Entity.onEntityDestroyed((entity) => {});

    Entity.onEntityCreated((entity) => {});

    Entity.onComponentAdded((entity, compName) => {});

    Entity.onComponentRemoved((entity, compName) => {});

    this.placeableEntityDataMap = placeableEntityDataMap; // @data source for placeable entities
    this.dispatchAction = this.dispatchAction.bind(this);

    const engine = new Engine();
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
      engine.addSystem(experienceSystem); // process destroyedEntities and do things
      engine.addSystem(dropItemSystem); // process destroyedEntities and do things
    }

    // Destroy all entities that need to be destroyed before rendering
    engine.addSystem(destroyEntitiesSystem);
    // Render game
    engine.addSystem(renderSystem);

    // End Tick system
    engine.addSystem(endTickSystem);
  }

  /**
   * Create an entity to represent the player starting position
   * This function is only called from the Editor
   */
  highlightStartPosition() {
    if (this.mode !== 'editing') {
      throw 'Calling highlightStartPosition from outside the editor is not allowed';
    }

    const startPosEntity = new BaseEntity();

    startPosEntity.addComponent({name: 'START_POS'});

    const {x, y} = this.getZoneStartXY();
    startPosEntity.addComponent(
      new Position({
        x,
        y,
        radius: 0.5 * TILE_SIZE
      })
    );

    startPosEntity.addComponent(
      new HasUI([
        {
          name: CANVAS_OUTPUT,
          shape: PossibleUIShapes.CIRCLE_SHAPE,
          data: {
            backgroundColor: 'lime'
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
      indexedTileMap: this.indexedTileMap,
      zone: this.zone,
      SPRITES: getSprites(),
      Entity,
      viewSize: this.viewSize,
      shouldRenderBackground: this.renderBackground,
      game: this,
      mapAPI,
      minimapAPI: miniMapAPI,
      gameEvents: this.gameEvents,
      placeableEntityDataMap: this.placeableEntityDataMap,
      destroyedPlaceableEntities: [] // An array containing entities that were destroyed, gets reset every tick after processing is done
    };
  }

  // TODO this is for development/ EDITOR mode only!
  setPlayerPosition(col: number, row: number) {
    const player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];
    player.setPos({
      x: TILE_SIZE / 2 + col * TILE_SIZE,
      y: TILE_SIZE / 2 + row * TILE_SIZE
    });

    this.centerOnPlayer();
  }

  // TODO this is for development/ EDITOR mode only!
  centerOnPlayer() {
    const player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED)[0];

    this.renderBackground = true; // for the first time

    if (this.mapAPI) {
      const mapAPI = this.mapAPI;
      const {viewWidth, viewHeight, mapWidth, mapHeight} = this.viewSize;

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

    const mapAPI = this.mapAPI;

    const zone = this.getZone();
    const {tileMap} = zone;

    const mapWidth = tileMap[0].length * TILE_SIZE;
    const mapHeight = tileMap.length * TILE_SIZE;

    this.renderBackground = true; // for the first time
    this.zone = zone;
    this.viewSize = {
      viewHeight: RESOLUTION.height,
      viewWidth: RESOLUTION.width,
      mapHeight,
      mapWidth
    };

    destroyAllButPlayer(); // TODO if we plan to have a single world, this is a problem :)
    this.indexedTileMap = createTileIndexMap(zone, this.viewSize);

    if (this.mode === 'editing') {
      this.highlightStartPosition();
    }

    // only out of editor mode, when playing
    if (this.mode === 'playing') {
      const playerData = this.placeableEntityDataMap[PLACEABLE_ENTITIES.PLAYER];
      const player = placePlayerInLevel(zone, this.indexedTileMap, playerStartingTile, playerData);
      placeLevelEntities(zone, this.indexedTileMap, this.placeableEntityDataMap);

      // set triggers
      // For editor, skip triggers
      if (isNonEmptyArray(zone.triggers.zoneStart)) {
        zone.triggers.zoneStart.forEach((configuredTrigger) => {
          // activateTrigger ...

          // TODO for development purposes, should be improved somehow
          const SKIP_DIALOGS = window.location.origin.indexOf('localhost') > -1;
          if (SKIP_DIALOGS) {
            return;
          }

          if (configuredTrigger.type === 'dialog') {
            pushTrigger(
              new DialogTrigger({
                type: 'dialog',
                oneOff: configuredTrigger.oneOff,
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

  getPlayerStateEvent(): PlayerStateChangeEvent {
    const player = Entity.getByComp<Player>(PLAYER_CONTROLLED)[0];
    return new PlayerStateChangeEvent({
      maxHealth: player[HEALTH].max,
      currentHealth: player[HEALTH].current,
      percentHealth: player[HEALTH].current / player[HEALTH].max,
      spendableXP: player[EXPERIENCE].XP,
      levelProgress: player[EXPERIENCE].getLevelProgress()
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
