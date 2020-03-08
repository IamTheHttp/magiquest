import GAME_PLATFORM from 'game-platform';
import renderSystem from './systems/renderSystem';
import userInputSystem, {IAction, pushAction} from './systems/userInputSystem';
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
import IEntity from "game-platform/types/lib/ECS/Entity";

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
import {ITileIndexMap, IViewSize} from "../interfaces/interfaces";
import {ISystemArguments} from "../interfaces/gameloop.i";
import {PLAYER_CONTROLLED_COMP} from "components/ComponentNamesConfig";
import BaseEntity from "BaseEntity";
import {bit} from "config";

let {Entity, Engine} = GAME_PLATFORM;





declare type getCanvasAPICallback = () => ICanvasAPI;
declare type onAreaChangeCallback = (level: number, area: number) => void;

interface IGameConstructor {
  getMapAPI: getCanvasAPICallback;
  getMinimapAPI: getCanvasAPICallback;
  levelArea: ILevelArea;
  viewSize: IViewSize;
  onAreaChange: onAreaChangeCallback;
}


// TODO this shouldn't be any
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

  constructor({getMapAPI, getMinimapAPI, levelArea, viewSize, onAreaChange}: IGameConstructor) {
    Entity.reset();

    let engine = new Engine();
    this.engine = engine;
    this.getMapAPI = getMapAPI;
    this.getMinimapAPI = getMinimapAPI;
    this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 2000);
    this.dispatchAction = this.dispatchAction.bind(this);
    this.onAreaChange = onAreaChange;

    this.setLevelArea(levelArea, viewSize);

    // TODO create interface for SystemArguments
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
      minimapAPI: getMinimapAPI()
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
    let [col, row] = tile.tileIdx.split('-');
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

  dispatchAction(action: IAction) {
    pushAction(action);
  }
}


export default GameLoop;