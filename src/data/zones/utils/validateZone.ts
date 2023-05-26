import hasValue from '../../../gameEngine/utils/hasValue';
import {PLACEABLE_ENTITIES} from '../../../gameEngine/gameConstants';
import {IZone} from '../../../interfaces/IZones';

/**
 * validates the properties of the zone, throws for any violation
 * @param zone
 */
export function validateZone(zone: IZone) {
  const ERROR_PREFIX = `Invalid ZoneJSON/${zone.act}-${zone.chapter}`;

  if (!hasValue(zone.chapter)) {
    throw 'Invalid ZoneJSON - Missing zone.chapter';
  }

  if (!hasValue(zone.act)) {
    throw 'Invalid ZoneJSON - Missing zone.act';
  }

  if (!hasValue(zone.triggers)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers`;
  }

  if (!hasValue(zone.triggers.move)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers.move`;
  }

  if (!hasValue(zone.triggers.zoneStart)) {
    throw `${ERROR_PREFIX} - Missing zone.triggers.zoneStart`;
  }

  if (!hasValue(zone.locations)) {
    throw `${ERROR_PREFIX} - Missing zone.locations`;
  }

  if (!hasValue(zone.spawnableEnemies)) {
    throw `${ERROR_PREFIX} - Missing zone.spawnableEnemies`;
  }

  zone.spawnableEnemies.forEach((enemyID) => {
    if (!PLACEABLE_ENTITIES.includes(enemyID)) {
      throw `${ERROR_PREFIX} - Invalid entity - id "${enemyID}" 
      does not appear in ${PLACEABLE_ENTITIES.toString()} of ENTITIES`;
    }
  });

  zone.entitiesToPlace.forEach((ent) => {
    if (!PLACEABLE_ENTITIES.includes(ent.characterType)) {
      throw `${ERROR_PREFIX} - Invalid entity - id "${
        ent.characterType
      }" does not appear in ${PLACEABLE_ENTITIES.toString()} of ENTITIES`;
    }
  });
}
