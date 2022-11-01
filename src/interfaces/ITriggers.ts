import {ITileCoordinate} from './IZones';
import {BaseEntity} from '../gameEngine/BaseEntity';
export type ITriggerLinesOfText = {
  text: string;
  speaker?: string; // Used to pass arbitrary speaker as a string, for example: "Hint!"
}[];

export interface ActOnEntityTriggers {
  [key: string]: (IDialogTrigger | IPortalTrigger)[];
}

export interface MoveTriggers {
  [key: string]: (IDialogTrigger | IPortalTrigger)[];
}

export interface ITriggerConstructor {
  id?: string; // a way to pass an ID to a trigger, useful to handle "oneOffs"
  oneOff: boolean;
  type: 'dialog' | 'portal';
}

export interface IDialogTrigger extends ITriggerConstructor {
  type: 'dialog';
  lines: ITriggerLinesOfText;
  actedOnEntity: BaseEntity; // TODO what is this used for?
}

export interface IPortalTrigger extends ITriggerConstructor {
  id?: string; // a way to pass an ID to a trigger, useful to handle "oneOffs"
  type: 'portal';
  act: number;
  chapter: number;
  exitTile: ITileCoordinate;
}
