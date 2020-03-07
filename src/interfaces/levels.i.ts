import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from "./triggers.i";
import {ISpawnableEnemies} from "./interfaces";
import {CHARACTERS} from "gameConstants";

export type ITileMap = Array<Array<number>>

export type IEntitiesToPlace = {
  type: CHARACTERS,
  pos: {
    col: number,
    row: number
  }
  name: string
}[];

export type PossibleTriggersArray = (IDialogTrigger | IPortalTrigger)[];

export interface ILevelLocation {
  name: string,
  spawnableEnemies: ISpawnableEnemies,
  start: {
    col: number;
    row: number;
  },
  end: {
    col: number;
    row: number;
  }
}

export interface ILevelArea {
  locations: ILevelLocation[],
  levelName: string,
  startPos: {
    col: number,
    row: number
  },
  triggers: {
    levelStart: PossibleTriggersArray,
    actOnEntity: ActOnEntityTriggers,
    move: MoveTriggers
  },
  entitiesToPlace: IEntitiesToPlace,
  tileMap: ITileMap
}