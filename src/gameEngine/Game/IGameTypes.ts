import {ITileCoordinate} from "../../interfaces/levels.i";
import {Painter} from "game-platform/dist/lib/PainterAPI/Painter";

export type getCanvasAPICallback = () => Painter;
export type onAreaChangeCallback = (level: number, area: number, newPlayerPosition: ITileCoordinate) => void;

export interface IGameConstructor {
  onAreaChange: onAreaChangeCallback;
};