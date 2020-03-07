import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from "./triggers.i";
import {ISpawnableEnemies} from "./interfaces";
import {CHARACTERS} from "gameConstants";

export type ITileMap = Array<Array<number>>

export type IEntitiesToPlace = {
  type:CHARACTERS,
  pos : {
    col:number,
    row:number
  }
  name:string
}[];

export type PossibleTriggersArray = (IDialogTrigger|IPortalTrigger)[];
export interface ILevelArea {
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
  tileMap: ITileMap,
  spawnableEnemies: ISpawnableEnemies
}