import {ITileCoordinate} from '../../interfaces/IZones';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';

export type getCanvasAPICallback = () => Painter;
export type onZoneChangeCallback = (act: number, chapter: number, newPlayerPosition: ITileCoordinate) => void;

export interface IGameConstructor {
  onZoneChange: onZoneChangeCallback;
  mode: 'editing' | 'playing';
}
