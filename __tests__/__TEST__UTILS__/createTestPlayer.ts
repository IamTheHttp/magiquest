import Player from '../../src/gameEngine/entities/placeableEntities/Player';
import {TILE_SIZE} from '../../src/gameEngine/gameConstants';
import {createPlayerMoveAnimationDefinition} from '../../src/gameEngine/entities/animations/playerAnimations';
import {INVENTORY} from '../../src/gameEngine/components/_ComponentNames';

function createTestPlayer(col: number, row: number) {
  const player = new Player(
    {
      col,
      row,
      entityLevel: 1,
      spawningTileLocationID: null
    },
    {
      id: 'PLAYER',
      displayName: "'The amazing player'",
      dmg: 2500,
      health: 1500,
      speedTilesPerSecond: 4,
      vision: 0,
      attackSpeed: 'FASTEST',
      radius: TILE_SIZE / 2,
      possibleAnimationsForEntity: createPlayerMoveAnimationDefinition(4) // 4 is arbitrarily chosen, not used in tests
    }
  );

  player[INVENTORY].resetInventory();

  return player;
}

export default createTestPlayer;
