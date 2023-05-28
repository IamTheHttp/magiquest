import charImageURL from '../../../assets/player.png';
import {commonMoveAnimations} from './characterAnimations';

export function createPlayerMoveAnimationDefinition(speedTilesPerSecond: number) {
  return {
    ...commonMoveAnimations(charImageURL, speedTilesPerSecond)
  };
}
