import enemyCharSpriteURL from '../../../assets/generic_enemy.png';
import {commonMoveAnimations} from './characterAnimations';

/**
 * Create a movement animation.
 * Requires the speed of the entity sync the duration of the animation with the duration of movement
 * @param movementSpeed
 */
export function createEnemyMoveAnimationDefinition(movementSpeed: number) {
  return {
    ...commonMoveAnimations(enemyCharSpriteURL, movementSpeed)
  };
}
