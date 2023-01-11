import {Entity} from 'game-platform';
import Game from '../gameEngine/Game';
import GameEvents from '../gameEngine/classes/GameEvents';
import {IZone} from './IZones';
import {ITileIndexMap, IViewSize} from './IGeneral';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';
import {IPlaceableEntityDataMap} from './IPlaceableEntityData';
import {getSprites} from '../gameEngine/getSprites';
import PlaceableEntity from '../gameEngine/entities/placeableEntities/PlaceableEntity';

export interface ISystemArguments {
  tileIdxMap: ITileIndexMap;
  Entity: typeof Entity; // The game-platform static Entity
  mapAPI: Painter;
  minimapAPI: Painter;
  game: Game;
  viewSize: IViewSize;
  zone: IZone;
  shouldRenderBackground: boolean;
  SPRITES: ReturnType<typeof getSprites>;
  gameEvents: GameEvents;
  placeableEntityDataMap: IPlaceableEntityDataMap;
  destroyedPlaceableEntities: PlaceableEntity[];
}
