import {IPlaceableEntityData, IPlaceableEntityDataMap} from '../interfaces/IPlaceableEntityData';
import {createPlayerMoveAnimationDefinition} from '../gameEngine/entities/animations/playerAnimations';
import {createEnemyMoveAnimationDefinition} from '../gameEngine/entities/animations/enemyAnimations';
import {PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';
import {IPlaceableEntityJSON} from '../interfaces/IPlaceableEntityJSON';

export function parsePlaceableEntityJSON(placeableEntitiesJSON: IPlaceableEntityJSON[]) {
  let placeableEntityMap: IPlaceableEntityDataMap = {};

  placeableEntitiesJSON.forEach((entityJSON: IPlaceableEntityJSON) => {
    let animations = null;
    if (entityJSON.animationTypes === 'PLAYER_ANIMATION') {
      animations = createPlayerMoveAnimationDefinition(entityJSON.speed);
    } else if (entityJSON.animationTypes === 'ENEMY_ANIMATION') {
      animations = createEnemyMoveAnimationDefinition(entityJSON.speed);
    } else {
      // nothing, stay null
    }

    placeableEntityMap[entityJSON.id as PLACEABLE_ENTITIES] = {
      ...(entityJSON as unknown as IPlaceableEntityData),
      possibleAnimationsForEntity: animations
    };
  });

  return placeableEntityMap;
}
