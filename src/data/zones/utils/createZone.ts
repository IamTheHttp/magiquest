import {ITileMap, IZone, PossibleTriggersArray} from '../../../interfaces/IZones';
import {IPortalTrigger} from '../../../interfaces/ITriggers';
import {validateZone} from './validateZone';
import {IZoneJSON} from '../../../interfaces/IZoneJSON';

/**
 * This function creates a Zone object
 * it accepts JSON data and other arguments, and generates a model object of the zone (IZone)
 * @param id
 * @param tileMap
 * @param zoneJSON
 */
function createZone(id: string, tileMap: ITileMap, zoneJSON: IZoneJSON): IZone {
  if (!zoneJSON) {
    console.error(`Could not find a zone in the zone config for the map ${id}`);
    return;
  }

  const NEW_ZONE: IZone = {
    ...zoneJSON,
    id,
    tileMap
  };

  // Dynamically add portal triggers based on the exits in the JSON
  Object.keys(zoneJSON.exits).forEach((tileCoordinate) => {
    const trigger = {
      oneOff: false,
      type: 'portal',
      act: zoneJSON.exits[tileCoordinate].act,
      chapter: zoneJSON.exits[tileCoordinate].chapter,
      exitTile: zoneJSON.exits[tileCoordinate].exitTile
    } as IPortalTrigger;

    // If the move triggers is not yet set as an array, create it
    if (!NEW_ZONE.triggers.move[tileCoordinate]) {
      // Set move triggers for this tile as an array
      NEW_ZONE.triggers.move[tileCoordinate] = [] as PossibleTriggersArray;
    }

    // Add another move trigger to this tile
    NEW_ZONE.triggers.move[tileCoordinate].push(trigger);
  });

  validateZone(NEW_ZONE);
  return NEW_ZONE;
}

export {createZone};
