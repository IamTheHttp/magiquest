import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from './ITriggers';
import {AllowedZoneLocationIDs, CHARACTERS} from '../gameEngine/gameConstants';
import {IZoneJSON} from '../data/jsonTypes/IZoneJSON';

export type ITileMap = number[][];

export interface ITileCoordinate {
  col: number;
  row: number;
}

export type IEntitiesToPlace = {
  characterType: CHARACTERS;
  characterLevel: number;
  pos: ITileCoordinate;
  name: string;
}[];

export type PossibleTriggersArray = (IDialogTrigger | IPortalTrigger)[];

export interface IZoneLocation {
  name: string;
  id: AllowedZoneLocationIDs;
  start: ITileCoordinate;
  end: ITileCoordinate;
  locationCharacterLevel: number;
}

/**
 * This is the zone shape we expect in the game logic.
 * It extends the zone data by adding a map to it
 */
export interface IZone extends IZoneJSON {
  tileMap: ITileMap;
}
