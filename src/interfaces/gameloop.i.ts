import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";
import GameLoop from "Game";
import Entity from "game-platform/types/lib/ECS/Entity";
import {ILevelArea} from "./levels.i";
import {ITileIndexMap, IViewSize} from "./interfaces";
import {ISprite} from "utils/getSpriteCrop";

export interface ISystemArguments {
  tileIdxMap: ITileIndexMap,
  Entity: typeof Entity,
  mapAPI: CanvasAPI,
  minimapAPI:CanvasAPI,
  game: GameLoop,
  viewSize: IViewSize,
  levelArea: ILevelArea,
  shouldRenderBackground: boolean,
  tileSetSprite: HTMLImageElement,
  characterSprite: HTMLImageElement
}