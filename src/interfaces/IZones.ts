import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from './ITriggers';
import {INoSpawnLocation} from './IZoneData';
import {AllowedLevelLocationIDs, CHARACTERS} from '../gameEngine/gameConstants';

export type ITileMap = Array<Array<number>>;

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

export interface ILevelLocation {
  name: string;
  id: AllowedLevelLocationIDs;
  start: ITileCoordinate;
  end: ITileCoordinate;
  locationCharacterLevel: number;
}

/**
 * This is the zone shape we expect in the game logic.
 * This is after all parsing and merging of json -> live object.
 */
export interface IZone {
  monsterDensity: number;
  locations: ILevelLocation[];
  zoneID: string;
  spawnableEnemies: CHARACTERS[];
  noSpawnLocations: INoSpawnLocation[];
  startPos: ITileCoordinate;
  triggers: {
    levelStart: PossibleTriggersArray;
    actOnEntity: ActOnEntityTriggers;
    move: MoveTriggers;
  };
  entitiesToPlace: IEntitiesToPlace;
  tileMap: ITileMap;
}
