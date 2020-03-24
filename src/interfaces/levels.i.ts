import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from "./triggers.i";
import {ISpawnableEnemies} from "./interfaces";
import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";

export type ITileMap = Array<Array<number>>

export type IEntitiesToPlace = {
  characterType: CHARACTERS,
  characterLevel: number,
  pos: {
    col: number,
    row: number
  }
  name: string,
}[];

export type PossibleTriggersArray = (IDialogTrigger | IPortalTrigger)[];

export interface ILevelLocation {
  name: string,
  id: AllowedLevelLocationIDs,
  spawnableEnemies: ISpawnableEnemies,
  start: {
    col: number;
    row: number;
  },
  end: {
    col: number;
    row: number;
  },
  locationCharacterLevel:number;
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