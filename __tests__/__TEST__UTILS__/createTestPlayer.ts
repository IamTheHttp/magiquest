import Player from '../../src/gameEngine/entities/placeableEntities/Player';
import {ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES, TILE_SIZE} from '../../src/gameEngine/gameConstants';
import {createPlayerMoveAnimationDefinition} from '../../src/gameEngine/entities/animations/playerAnimations';
import {INVENTORY_COMP} from '../../src/gameEngine/components/ComponentNamesConfig';

function createTestPlayer(col: number, row: number) {
  const player = new Player(
    {
      col,
      row,
      entityLevel: 1,
      spawningTileLocationID: null
    },
    {
      id: PLACEABLE_ENTITIES.PLAYER,
      displayName: "'The amazing player'",
      dmg: 2500,
      health: 1500,
      speed: 4,
      vision: 0,
      attackSpeed: ATTACK_SPEEDS_OPTIONS.FASTEST,
      radius: TILE_SIZE / 2,
      possibleAnimationsForEntity: createPlayerMoveAnimationDefinition(4) // 4 is arbitrarily chosen, not used in tests
    }
  );

  player[INVENTORY_COMP].resetInventory();

  return player;
}

export default createTestPlayer;
