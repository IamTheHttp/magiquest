import {
  IEntitiesToPlace,
  IZoneLocation,
  ITileCoordinate,
  ITileMap,
  PossibleTriggersArray
} from '../../interfaces/IZones';
import {CHARACTERS} from '../../gameEngine/gameConstants';
import {ActOnEntityTriggers, MoveTriggers} from '../../interfaces/ITriggers';

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
  spawnableEnemies: CHARACTERS[];

  description: string;
  exits: IExits;
}
