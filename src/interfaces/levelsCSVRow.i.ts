import {CHARACTERS} from "gameConstants";

interface ILevelCSVRow {
  id: string;
  monster_spawns: CHARACTERS[];
  mon_per_tile: number;
  player_start_pos: {
    x: number;
    y: number;
  }
  exits: {
    [key:string]: {
      level:number;
      area:number;
    }
  }
}

export default ILevelCSVRow