interface ILevelCSVRow {
  id: string;
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