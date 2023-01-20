import charImageURL from '../../../assets/player.png';
import {commonMoveAnimations} from './characterAnimations';

export function createPlayerMoveAnimationDefinition(movementSpeed: number) {
  return {
    ...commonMoveAnimations(charImageURL, movementSpeed)
  };
}
