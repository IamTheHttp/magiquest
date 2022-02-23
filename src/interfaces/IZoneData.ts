import {ITileCoordinate} from './IZones';
import {ICoordinates} from 'game-platform/dist/lib/interfaces';
import {CHARACTERS} from '../gameEngine/gameConstants';

export interface IExits {
  [key: string]: {
    // key in the form of "x,y"
    act: number;
    chapter: number;
    exitTile: ITileCoordinate;
  };
}

export interface INoSpawnLocation {
  start: {
    row: number;
    col: number;
  };
  end: {
    row: number;
    col: number;
  };
}

/**
 * This is a JSON representation os a zone
 */
interface IZoneData {
  id: string;
  monster_spawns: CHARACTERS[];
  mon_per_tile: number;
  act: number;
  chapter: number;
  description: string;
  no_spawn_locations: INoSpawnLocation[];
  player_start_pos: ITileCoordinate;
  exits: IExits;
}

export default IZoneData;
