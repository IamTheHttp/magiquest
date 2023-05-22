import {IPlaceableEntityDataMap} from '../interfaces/IPlaceableEntityData';
import {createPlayerMoveAnimationDefinition} from '../gameEngine/entities/animations/playerAnimations';
import {createEnemyMoveAnimationDefinition} from '../gameEngine/entities/animations/enemyAnimations';
import {I_ATTACK_SPEED_OPTIONS, PLACEABLE_ENTITIES, TILE_SIZE} from '../gameEngine/gameConstants';
import {IPlaceableEntityJSON, PlaceableEntityZodSchema} from '../interfaces/IPlaceableEntityJSON';

export function parsePlaceableEntityJSON(placeableEntitiesJSON: IPlaceableEntityJSON[]) {
  const placeableEntityMap: IPlaceableEntityDataMap = {};

  placeableEntitiesJSON.forEach((entityJSON: IPlaceableEntityJSON) => {
    // Throws on error - Validate that the JSON structure is as expected
    // TODO - For performance reasons this might only be needed in debug mode
    PlaceableEntityZodSchema.parse(entityJSON);

    let animations = null;
    if (entityJSON.animationNames === 'PLAYER_ANIMATION') {
      animations = createPlayerMoveAnimationDefinition(entityJSON.speed);
    } else if (entityJSON.animationNames === 'ENEMY_ANIMATION') {
      animations = createEnemyMoveAnimationDefinition(entityJSON.speed);
    } else {
      // nothing, stay null
    }

    /**
     * Go from JSON representation to in memory object representation
     */
    placeableEntityMap[entityJSON.id as PLACEABLE_ENTITIES] = {
      possibleAnimationsForEntity: animations,
      id: entityJSON.id as PLACEABLE_ENTITIES,
      displayName: entityJSON.displayName,
      dmg: entityJSON.dmg,
      radius: entityJSON.sizeInTiles * TILE_SIZE,
      vision: entityJSON.vision,
      speed: entityJSON.speed,
      attackSpeed: entityJSON.attackSpeed as I_ATTACK_SPEED_OPTIONS,
      health: entityJSON.health
    };
  });

  return placeableEntityMap;
}
