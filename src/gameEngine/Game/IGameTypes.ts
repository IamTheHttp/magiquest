import {ITileCoordinate} from '../../interfaces/zones.i';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';

export type getCanvasAPICallback = () => Painter;
export type onZoneChangeCallback = (level: number, area: number, newPlayerPosition: ITileCoordinate) => void;

export interface IGameConstructor {
  onAreaChange: onZoneChangeCallback;
  mode: 'editing' | 'playing';
}
