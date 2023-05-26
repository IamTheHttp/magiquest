import FamNPC from '../../src/gameEngine/entities/placeableEntities/FamNPC';
import {TILE_SIZE} from '../../src/gameEngine/gameConstants';
import {createPlayerMoveAnimationDefinition} from '../../src/gameEngine/entities/animations/playerAnimations';

function createTestFamNPC(col: number, row: number) {
  return new FamNPC(
    {
      col,
      row,
      entityLevel: 1,
      spawningTileLocationID: null
    },
    {
      id: 'FAM_NPC',
      displayName: "'The amazing player'",
      dmg: 2500,
      health: 1500,
      speed: 4,
      vision: 0,
      attackSpeed: 'FASTEST',
      radius: TILE_SIZE / 2,
      possibleAnimationsForEntity: createPlayerMoveAnimationDefinition(4) // arbitrarily chosen, not used
    }
  );
}

export default createTestFamNPC;
