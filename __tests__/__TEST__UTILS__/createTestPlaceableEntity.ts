import {PLACEABLE_ENTITIES, TILE_SIZE} from '../../src/gameEngine/gameConstants';
import {IPlaceableEntityData} from '../../src/interfaces/IPlaceableEntityData';

export function createTestPlaceableEntity(entityData?: Partial<IPlaceableEntityData>): IPlaceableEntityData {
  const dataToMerge = entityData ? entityData : {};
  return {
    id: PLACEABLE_ENTITIES.PLAYER,
    displayName: "'The amazing player'",
    dmg: 2500,
    health: 1500,
    speed: 4,
    vision: 0,
    attackSpeed: 'FASTEST',
    radius: TILE_SIZE / 2,
    // animationTypes: createPlayerMoveAnimationDefinition(dataToMerge.speed || 1),
    ...dataToMerge
  };
}
