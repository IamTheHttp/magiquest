import IZoneData from '../../../interfaces/IZoneData';
import hasValue from '../../../gameEngine/utils/hasValue';
import {AllowedZoneLocationIDs, CHARACTERS} from '../../../gameEngine/gameConstants';

/**
 * validates the properties of the zone, throws for any violation
 * @param zoneData
 */
export function validateZone(zoneData: IZoneData) {
  const ERROR_PREFIX = `Invalid ZoneData/${zoneData.act}-${zoneData.chapter}`;

  if (!hasValue(zoneData.chapter)) {
    throw `Invalid ZoneData - Missing zone.chapter`;
  }

  if (!hasValue(zoneData.act)) {
    throw `Invalid ZoneData - Missing zone.act`;
  }

  if (!hasValue(zoneData.triggers)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers`;
  }

  if (!hasValue(zoneData.triggers.move)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers.move`;
  }

  if (!hasValue(zoneData.triggers.levelStart)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers.levelStart`;
  }

  if (!hasValue(zoneData.locations)) {
    throw `${ERROR_PREFIX} - Missing zone.locations`;
  }

  if (!hasValue(zoneData.spawnableEnemies)) {
    throw `${ERROR_PREFIX} - Missing zone.spawnableEnemies`;
  }

  zoneData.locations.forEach((location) => {
    if (!AllowedZoneLocationIDs[location.id]) {
      throw `${ERROR_PREFIX} - Invalid location - id "${location.id}" does not appear in ${Object.keys(
        AllowedZoneLocationIDs
      )} of AllowedLevelLocationIDs`;
    }
  });

  zoneData.spawnableEnemies.forEach((enemyID) => {
    if (!CHARACTERS[enemyID]) {
      throw `${ERROR_PREFIX} - Invalid character - id "${enemyID}" does not appear in ${Object.keys(
        CHARACTERS
      )} of CHARACTERS`;
    }
  });

  zoneData.entitiesToPlace.forEach((ent) => {
    if (!CHARACTERS[ent.characterType]) {
      throw `${ERROR_PREFIX} - Invalid character - id "${ent.characterType}" does not appear in ${Object.keys(
        CHARACTERS
      )} of CHARACTERS`;
    }
  });
}
