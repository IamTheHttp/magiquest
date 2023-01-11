import Player from '../../src/gameEngine/entities/placeableEntities/Player';
import {ATTACK_SPEEDS_OPTIONS, PLACEABLE_ENTITIES} from '../../src/gameEngine/gameConstants';
import playerAnimations from '../../src/gameEngine/entities/animations/playerAnimations';

function createTestPlayer(col: number, row: number) {
  return new Player(
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
      radius: 16,
      animationTypes: playerAnimations
    }
  );
}

export default createTestPlayer;
