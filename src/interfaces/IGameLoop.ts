import {Entity} from 'game-platform';
import Game from '../gameEngine/Game';
import GameEvents from '../gameEngine/classes/GameEvents';
import {IZone} from './IZones';
import {ITileIndexMap, IViewSize} from './IGeneral';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';

export interface ISystemArguments {
  tileIdxMap: ITileIndexMap;
  Entity: typeof Entity; // The game-platform static Entity
  mapAPI: Painter;
  minimapAPI: Painter;
  game: Game;
  viewSize: IViewSize;
  zone: IZone;
  shouldRenderBackground: boolean;
  tileSetSprite: HTMLImageElement;
  characterSprite: HTMLImageElement;
  gameEvents: GameEvents;
}
