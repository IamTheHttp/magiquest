import GAME_PLATFORM from 'game-platform';
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
import portalSystem, {isNonEmptyArray} from 'gameEngine/systems/portalSystem';

import IEngine from "game-platform/types/lib/Engine/Engine";

import {assetLoader} from 'cache/assetLoader';
import spawnEnemiesSystem from 'gameEngine/systems/spawnEnemiesSystem';
import createTileIndexMap from 'gameEngine/utils/createTileIndexMap';
import placeLevelEntities from 'gameEngine/utils/placeLevelEntities';
import placePlayerInLevel from 'gameEngine/utils/placePlayerInLevel';
import centerCameraOnEntity from 'gameEngine/utils/systemUtils/centerCameraOnEntity';
import destroyAllButPlayer from 'gameEngine/utils/destroyAllButPlayer';
import Tile from 'gameEngine/entities/Tile';
import assertType from 'gameEngine/utils/assertType';
import ICanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";
import {ILevelArea} from "../interfaces/levels.i";
import {IAction, IGameEventListener, ITileIndexMap, IViewSize} from "../interfaces/interfaces";
import {ISystemArguments} from "../interfaces/gameloop.i";
import {
  CHARACTER_ATTRIBUTES_COMP,
  CHARACTER_SKILLS_COMP,
  EXPERIENCE_COMP,
  HEALTH_COMP,
  PLAYER_CONTROLLED_COMP
} from "components/ComponentNamesConfig";
import BaseEntity from "BaseEntity";
import {bit} from "config";
import questSystem from "systems/questSystem";
import GameEvents, {EnemyKilledEvent, PlayerIsAttacked, PlayerSkillsChangeEvent} from "classes/GameEvents";
import experienceSystem from "systems/experienceSystem";
import getColRowByTileIdx from "utils/getColRowByTileIdx";
import Player from "entities/characters/Player";
import {PlayerStateChangeEvent} from "classes/PlayerState";

let {Entity, Engine} = GAME_PLATFORM;





declare type getCanvasAPICallback = () => ICanvasAPI;
declare type onAreaChangeCallback = (level: number, area: number) => void;

interface IGameConstructor {
  getMapAPI: getCanvasAPICallback;
  getMinimapAPI: getCanvasAPICallback;
  levelArea: ILevelArea;
  viewSize: IViewSize;
  onAreaChange: onAreaChangeCallback;
  gameEventListener: IGameEventListener
}

class GameLoop {
  engine:IEngine;
  getMapAPI: getCanvasAPICallback;
  getMinimapAPI: getCanvasAPICallback;
  onAreaChange: onAreaChangeCallback;
  tileIdxMap: ITileIndexMap;
  viewSize: IViewSize;
  levelArea:ILevelArea;
  renderBackground:boolean;
  isRunning: boolean;
  gameEvents: GameEvents;
  gameEventListener: IGameEventListener;

  constructor({getMapAPI, getMinimapAPI, levelArea, viewSize, onAreaChange, gameEventListener}: IGameConstructor) {
    Entity.reset();
    this.dispatchAction = this.dispatchAction.bind(this);

    let engine = new Engine();
    this.engine = engine;
    this.getMapAPI = getMapAPI;
    this.getMinimapAPI = getMinimapAPI;
    this.gameEventListener = gameEventListener;
    this.onAreaChange = onAreaChange;
    this.gameEvents = new GameEvents();

    // TODO this probably needs to be related to player movement speed
    // this should also probably be refactored out
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 100);
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
    engine.addSystem(questSystem);
    engine.addSystem(experienceSystem);

    // DestroyEntity system
    // TODO export to a system file
    engine.addSystem((systemArguments: ISystemArguments) => {
      let {gameEvents} = systemArguments;
      let hasEvents = gameEvents.getEvents().length > 0;
      gameEvents.getEvents().forEach((event) => {
        console.log('KILLING IN TEH NAME OF');
        if (event instanceof EnemyKilledEvent) {
          event.readEvent().entity.destroy();
        }
      });

      if (hasEvents) {
        console.log('Notifying UI that enemies killed');
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
        if (event instanceof PlayerIsAttacked || event instanceof PlayerSkillsChangeEvent) {
          this.dispatchGameEvent(this.getPlayerStateEvent());
        }
      });

      // throw away old events, create a new empty list
      this.gameEvents.endTick();
    });

    this.dispatchGameEvent(this.getPlayerStateEvent());
    // TODO resume? maybe start()?
    this.resume();
  }

  dispatchGameEvent(event: PlayerStateChangeEvent) {
    this.gameEventListener(event);
  }

  getSystemArguments(getMapAPI: getCanvasAPICallback, getMinimapAPI: getCanvasAPICallback): ISystemArguments {
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
      minimapAPI: getMinimapAPI(),
      gameEvents: this.gameEvents
    };
  }

  // TODO this is for development/ EDITOR mode only!
  setPlayerPosition(col: number, row: number) {
    let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;
    player.setPos({
      x: bit/2 + col * bit,
      y: bit/2 + row * bit
    });

    this.centerOnPlayer();
  }

  // TODO this is for development/ EDITOR mode only!
  centerOnPlayer() {
    let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;

    this.renderBackground = true; // for the first time

    let mapAPI = this.getMapAPI();
    let {viewWidth, viewHeight, mapWidth, mapHeight} = this.viewSize;

    centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
  }

  setLevelArea(levelArea: ILevelArea, viewSize: IViewSize) {
    let {viewWidth, viewHeight, mapWidth, mapHeight} = viewSize;
    let mapAPI = this.getMapAPI();
    this.renderBackground = true; // for the first time
    this.levelArea = levelArea;
    this.viewSize = viewSize;

    destroyAllButPlayer(); // TODO if we plan to have a single world, this is a problem :)

    this.tileIdxMap = createTileIndexMap(levelArea, viewSize);

    let player = placePlayerInLevel(levelArea, this.tileIdxMap);
    placeLevelEntities(levelArea, this.tileIdxMap);

    // set triggers
    if (isNonEmptyArray(levelArea.triggers.levelStart)) {
      levelArea.triggers.levelStart.forEach((configuredTrigger) => {
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

    centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
    this.renderBackground = true; // for the first time
  }

  // TODO - EDITOR MODE ONLY
  changeTileType(tile: Tile, newType: number): ILevelArea {
    assertType(tile, 'Tile', 'object');

    tile.setTileType(newType);

    // levelArea.tileMap[row][col], this the RAW json that creates the level - this is what we want to save after..
    let {col, row} = getColRowByTileIdx(tile.tileIdx);
    this.levelArea.tileMap[row][col] = +newType;

    this.renderBackground = true; // for the first time
    return this.levelArea;
  }

  handleAreaChange(level: number, area: number) {
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

  activateTrigger(trigger: Trigger) {
    pushTrigger(trigger);
  }

  getPlayerStateEvent(): PlayerStateChangeEvent {
    const player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as Player;
    return new PlayerStateChangeEvent({
      maxHealth: player[HEALTH_COMP].max,
      currentHealth: player[HEALTH_COMP].current,
      percentHealth: player[HEALTH_COMP].current / player[HEALTH_COMP].max,
      skills: [...player[CHARACTER_SKILLS_COMP].skills],
      spendableXP: player[EXPERIENCE_COMP].XP,
      levelProgress: player[EXPERIENCE_COMP].getLevelProgress(),
      attributes : player[CHARACTER_ATTRIBUTES_COMP].attributes
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


export default GameLoop;