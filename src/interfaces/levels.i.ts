import {ActOnEntityTriggers, IDialogTrigger, MoveTriggers, IPortalTrigger} from "./triggers.i";
import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";
import {ICoordinates} from "game-platform/types/lib/interfaces";
import {INoSpawnLocation} from "./IParsedLevelCSVRow";

export type ITileMap = Array<Array<number>>

export interface ITileCoordinate {
  col: number,
  row: number
}

export type IEntitiesToPlace = {
  characterType: CHARACTERS,
  characterLevel: number,
  pos: ITileCoordinate
  name: string,
}[];

export type PossibleTriggersArray = (IDialogTrigger | IPortalTrigger)[];

export interface ILevelLocation {
  name: string,
  id: AllowedLevelLocationIDs,
  start: ITileCoordinate
  end: ITileCoordinate
  locationCharacterLevel:number;
}

/**
 * This is the level shape we expect in the game logic.
 * This is after all parsing and merging from csv -> json -> live object.
 */
export interface ILevelArea {
  monsterDensity:number;
  locations: ILevelLocation[];
  levelAreaID: string;
  spawnableEnemies: CHARACTERS[];
  noSpawnLocations: INoSpawnLocation[],
  startPos: ITileCoordinate
  triggers: {
    levelStart: PossibleTriggersArray,
    actOnEntity: ActOnEntityTriggers,
    move: MoveTriggers
  },
  entitiesToPlace: IEntitiesToPlace,
  tileMap: ITileMap
}