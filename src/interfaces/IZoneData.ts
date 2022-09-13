import {IEntitiesToPlace, IZoneLocation, ITileCoordinate, ITileMap, PossibleTriggersArray} from './IZones';
import {CHARACTERS} from '../gameEngine/gameConstants';
import {ActOnEntityTriggers, MoveTriggers} from './ITriggers';

export interface IExits {
  [key: string]: {
    act: number;
    chapter: number;
    exitTile: ITileCoordinate;
  };
}

export interface INoSpawnLocation {
  start: {
    row: number;
    col: number;
  };
  end: {
    row: number;
    col: number;
  };
}

/**
 * This is a JSON representation os a zone
 */
interface IZoneData {
  act: number;
  chapter: number;
  id: string;
  monsterDensity: number;
  locations: IZoneLocation[];
  noSpawnLocations: INoSpawnLocation[];
  playerStartPos: ITileCoordinate;
  triggers: {
    levelStart: PossibleTriggersArray;
    actOnEntity: ActOnEntityTriggers;
    move: MoveTriggers;
  };
  entitiesToPlace: IEntitiesToPlace;
  spawnableEnemies: CHARACTERS[];

  description: string;
  exits: IExits;
}

export default IZoneData;
