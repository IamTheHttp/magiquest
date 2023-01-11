import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from './ITriggers';
import {AllowedZoneLocationIDs, PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';
import {IZoneJSON} from './IZoneJSON';

export type ITileMap = number[][];

export interface ITileCoordinate {
  col: number;
  row: number;
}

export type IEntitiesToPlace = {
  characterType: keyof typeof PLACEABLE_ENTITIES;
  entityLevel: number;
  pos: ITileCoordinate;
  name: string;
}[];

export type PossibleTriggersArray = (IDialogTrigger | IPortalTrigger)[];

export interface IZoneLocation {
  name: string;
  id: AllowedZoneLocationIDs;
  start: ITileCoordinate;
  end: ITileCoordinate;
  locationEntityLevel: number;
}

/**
 * This is the zone shape we expect in the game logic.
 * It extends the zone data by adding a map to it
 */
export interface IZone extends IZoneJSON {
  tileMap: ITileMap;
}
