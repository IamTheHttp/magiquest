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
  start: ICoordinates;
  end: ICoordinates;
}

/**
 * This is a parsed zones.csv row
 */
interface IParsedLevelCSVRow {
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

export default IParsedLevelCSVRow;
