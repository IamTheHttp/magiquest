import enemyCharSpriteURL from '../../../assets/generic_enemy.png';
import {commonMoveAnimations} from './characterAnimations';

/**
 * Create a movement animation.
 * Requires the speedTilesPerSecond of the entity sync the duration of the animation with the duration of movement
 * @param speedTilesPerSecond
 */
export function createEnemyMoveAnimationDefinition(speedTilesPerSecond: number) {
  return {
    ...commonMoveAnimations(enemyCharSpriteURL, speedTilesPerSecond)
  };
}
