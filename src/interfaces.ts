import Entity from "game-platform/types/lib/ECS/Entity";
import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";
import GameLoop from "Game";
import IndexedTile from "classes/IndexedTile";
import {CHARACTERS} from "gameConstants";

/**
 * Represents the resolution properties of the game
 * "view" - represents the main view (player view), main screen.
 * "map" - represents the the entire map, so viewWidth <= mapWidth
 */
export interface IViewSize {
  viewHeight: number
  viewWidth: number
  mapHeight: number
  mapWidth: number
}

export interface ITileIndexMap {
  [key: string]: IndexedTile
}

interface Trigger {
  oneOff: boolean,
  type: string, // TODO what are the options?
  lines : {
    [key: number]: {
      text: string,
      speaker: number
    }
  }
}

export interface ILevelArea {
  startPos: {
    col: number,
    row: number
  },
  triggers: {
    levelStart: Trigger,
    actOnEntity: Trigger,
    move: Trigger
  },
  entitiesToPlace: {type: string, name:string}[],
  tileMap: Array<Array<number>>,
  spawnableEnemies: Array<{
    chance: number,
    enemy: string
  }>
}

export interface ISystemArguments {
  tileIdxMap: ITileIndexMap,
  Entity: typeof Entity,
  mapAPI: CanvasAPI,
  miniMapAPI:CanvasAPI
  game: GameLoop,
  viewSize: IViewSize,
  levelArea: ILevelArea,
  shouldRenderBackground: boolean
}