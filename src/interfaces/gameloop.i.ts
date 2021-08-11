import {Entity} from "game-platform";
import CanvasAPI from "game-platform/dist/lib/CanvasAPI/CanvasAPI";
import GameLoop from "../gameEngine/Game";
import GameEvents from "../gameEngine/classes/GameEvents";
import {ILevelArea} from "./levels.i";
import {ITileIndexMap, IViewSize} from "./interfaces";


export interface ISystemArguments {
  tileIdxMap: ITileIndexMap,
  Entity: typeof Entity, // The game-platform static Entity
  mapAPI: CanvasAPI,
  minimapAPI:CanvasAPI,
  game: GameLoop,
  viewSize: IViewSize,
  levelArea: ILevelArea,
  shouldRenderBackground: boolean,
  tileSetSprite: HTMLImageElement,
  characterSprite: HTMLImageElement,
  gameEvents: GameEvents
}