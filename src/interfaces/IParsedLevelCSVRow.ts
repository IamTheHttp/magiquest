import {ITileCoordinate} from "./zones.i";
import {ICoordinates} from "game-platform/dist/lib/interfaces";
import {CHARACTERS} from "../gameEngine/gameConstants";

export interface IExits {
  [key: string]: { // key in the form of "x,y"
    area: number,
    level: number,
    exitTile: ITileCoordinate
  }
}

export interface INoSpawnLocation {
  start: ICoordinates,
  end: ICoordinates
}


/**
 * This is a parsed zones.csv row
 */
interface IParsedLevelCSVRow {
  id: string;
  monster_spawns: CHARACTERS[];
  mon_per_tile: number;
  level: number,
  area:number,
  description:string,
  no_spawn_locations:INoSpawnLocation[],
  player_start_pos: ITileCoordinate
  exits: IExits
}

export default IParsedLevelCSVRow