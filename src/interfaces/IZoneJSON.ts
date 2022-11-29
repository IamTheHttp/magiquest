import {IEntitiesToPlace, IZoneLocation, ITileCoordinate, ITileMap, PossibleTriggersArray} from './IZones';
import {PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';
import {ActOnEntityTriggers, MoveTriggers} from './ITriggers';

interface IExits {
  [key: string]: {
    act: number;
    chapter: number;
    exitTile: ITileCoordinate;
  };
}

interface INoSpawnLocation {
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
export interface IZoneJSON {
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
  spawnableEnemies: (keyof typeof PLACEABLE_ENTITIES)[];

  description: string;
  exits: IExits;
}
