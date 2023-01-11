import FamNPC from '../../src/gameEngine/entities/placeableEntities/FamNPC';
import {ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES} from '../../src/gameEngine/gameConstants';
import playerAnimations from '../../src/gameEngine/entities/animations/playerAnimations';

function createTestFamNPC(col: number, row: number) {
  return new FamNPC(
    {
      col,
      row,
      entityLevel: 1,
      spawningTileLocationID: null
    },
    {
      id: PLACEABLE_ENTITIES.FAM_NPC,
      displayName: "'The amazing player'",
      dmg: 2500,
      health: 1500,
      speed: 4,
      vision: 0,
      attackSpeed: ATTACK_SPEEDS_OPTIONS.FASTEST,
      radius: 16,
      animationTypes: playerAnimations
    }
  );
}

export default createTestFamNPC;
