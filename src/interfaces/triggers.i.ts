import BaseEntity from "BaseEntity";
import {ITileCoordinate} from "./levels.i";
export type ITriggerLinesOfText = {
  text:string,
  speaker: number
}[];


export interface ActOnEntityTriggers {
  [key:string]: (IDialogTrigger|IPortalTrigger)[]
}

export interface MoveTriggers {
  [key:string]: (IDialogTrigger|IPortalTrigger)[]
}


export interface IDialogTrigger {
  oneOff: boolean,
  type: 'dialog',
  lines: ITriggerLinesOfText,
  actedOnEntity?: BaseEntity // TODO what is this used for?
}

export interface IPortalTrigger {
  oneOff: boolean,
  type: 'portal',
  level: number,
  area: number,
  exitTile: ITileCoordinate
}