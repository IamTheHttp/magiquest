import {TILE_SIZE} from '../../src/gameEngine/gameConstants';
import {IPlaceableEntityData} from '../../src/interfaces/IPlaceableEntityData';

export function createTestPlaceableEntity(entityData?: Partial<IPlaceableEntityData>): IPlaceableEntityData {
  const dataToMerge = entityData ? entityData : {};
  return {
    id: 'PLAYER',
    displayName: "'The amazing player'",
    dmg: 2500,
    health: 1500,
    speedTilesPerSecond: 4,
    vision: 0,
    attackSpeed: 'FASTEST',
    radius: TILE_SIZE / 2,
    // animationTypes: createPlayerMoveAnimationDefinition(dataToMerge.speedTilesPerSecond || 1),
    ...dataToMerge
  };
}
