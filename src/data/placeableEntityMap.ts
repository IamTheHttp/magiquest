import {IPlaceableEntityData, IPlaceableEntityDataMap} from '../interfaces/IPlaceableEntityData';
import playerAnimations from '../gameEngine/entities/animations/playerAnimations';
import enemyAnimations from '../gameEngine/entities/animations/enemyAnimations';
import {PLACEABLE_ENTITIES} from '../gameEngine/gameConstants';

import {IPlaceableEntityJSON} from '../interfaces/IPlaceableEntityJSON';
import {getAllPlaceableEntityJSONFiles} from '../utils/getAllPlaceableEntityJSONFiles';

const entities = getAllPlaceableEntityJSONFiles();
let placeableEntityMap: IPlaceableEntityDataMap = {};

entities.forEach((entityJSON: IPlaceableEntityJSON) => {
  let animations = null;
  if (entityJSON.animationTypes === 'PLAYER_ANIMATION') {
    animations = playerAnimations;
  } else if (entityJSON.animationTypes === 'ENEMY_ANIMATION') {
    animations = enemyAnimations;
  } else {
    // nothing, stay null
  }

  placeableEntityMap[entityJSON.id as PLACEABLE_ENTITIES] = {
    ...(entityJSON as unknown as IPlaceableEntityData),
    animationTypes: animations
  };
});

export {placeableEntityMap};
