import {ISystemArguments} from '../../interfaces/IGameLoop';

/**
 * DestroyEntity system - this system is responsible for all the logic that happens when an entity is destroyed.
 * Such as cleanup
 * TODO export to a system file
 */
export function destroyEntitiesSystem(systemArguments: ISystemArguments) {
  const {destroyedPlaceableEntities} = systemArguments;

  destroyedPlaceableEntities.forEach((ent) => {
    ent.destroy();
  });
}
