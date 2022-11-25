import Player from '../../src/gameEngine/entities/placeableEntities/Player';
import {placeableEntityMap} from '../../src/data/placeableEntityMap';
import {PLACEABLE_ENTITIES} from '../../src/gameEngine/gameConstants';

function createTestPlayer(col: number, row: number) {
  return new Player(
    {
      col,
      row,
      characterLevel: 1,
      spawningTileLocationID: null
    },
    placeableEntityMap[PLACEABLE_ENTITIES.PLAYER]
  );
}

export default createTestPlayer;
