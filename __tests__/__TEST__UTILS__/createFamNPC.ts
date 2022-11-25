import FamNPC from '../../src/gameEngine/entities/placeableEntities/FamNPC';
import {placeableEntityMap} from '../../src/data/placeableEntityMap';
import {PLACEABLE_ENTITIES} from '../../src/gameEngine/gameConstants';

function createFamNPC(col: number, row: number) {
  return new FamNPC(
    {
      col,
      row,
      characterLevel: 1,
      spawningTileLocationID: null
    },
    placeableEntityMap[PLACEABLE_ENTITIES.FAM_NPC]
  );
}

export default createFamNPC;
