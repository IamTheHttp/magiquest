import hasValue from '../../../gameEngine/utils/hasValue';
import {AllowedZoneLocationIDs, CHARACTERS} from '../../../gameEngine/gameConstants';
import {IZone} from '../../../interfaces/IZones';

/**
 * validates the properties of the zone, throws for any violation
 * @param zone
 */
export function validateZone(zone: IZone) {
  const ERROR_PREFIX = `Invalid ZoneJSON/${zone.act}-${zone.chapter}`;

  if (!hasValue(zone.chapter)) {
    throw `Invalid ZoneJSON - Missing zone.chapter`;
  }

  if (!hasValue(zone.act)) {
    throw `Invalid ZoneJSON - Missing zone.act`;
  }

  if (!hasValue(zone.triggers)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers`;
  }

  if (!hasValue(zone.triggers.move)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers.move`;
  }

  if (!hasValue(zone.triggers.levelStart)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers.levelStart`;
  }

  if (!hasValue(zone.locations)) {
    throw `${ERROR_PREFIX} - Missing zone.locations`;
  }

  if (!hasValue(zone.spawnableEnemies)) {
    throw `${ERROR_PREFIX} - Missing zone.spawnableEnemies`;
  }

  zone.locations.forEach((location) => {
    if (!AllowedZoneLocationIDs[location.id]) {
      throw `${ERROR_PREFIX} - Invalid location - id "${location.id}" does not appear in ${Object.keys(
        AllowedZoneLocationIDs
      )} of AllowedLevelLocationIDs`;
    }
  });

  zone.spawnableEnemies.forEach((enemyID) => {
    if (!CHARACTERS[enemyID]) {
      throw `${ERROR_PREFIX} - Invalid character - id "${enemyID}" does not appear in ${Object.keys(
        CHARACTERS
      )} of CHARACTERS`;
    }
  });

  zone.entitiesToPlace.forEach((ent) => {
    if (!CHARACTERS[ent.characterType]) {
      throw `${ERROR_PREFIX} - Invalid character - id "${ent.characterType}" does not appear in ${Object.keys(
        CHARACTERS
      )} of CHARACTERS`;
    }
  });
}
