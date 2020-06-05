import {CHARACTERS} from "gameConstants";
import {ICoordinates} from "game-platform/types/lib/interfaces";

export interface IExits {
  [key: string]: { // key in the form of "x,y"
    area: number,
    level: number
  }
}

export interface INoSpawnLocation {
  start: ICoordinates,
  end: ICoordinates
}


/**
 * This is a parsed levels.csv row
 */
interface IParsedLevelCSVRow {
  id: string;
  monster_spawns: CHARACTERS[];
  mon_per_tile: number;
  level: number,
  area:number,
  description:string,
  no_spawn_locations:INoSpawnLocation[],
  player_start_pos: {
    x: number;
    y: number;
  }
  exits: IExits
}

export default IParsedLevelCSVRow