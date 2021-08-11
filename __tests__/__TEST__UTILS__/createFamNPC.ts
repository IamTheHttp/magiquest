import FamNPC from "../../src/gameEngine/entities/characters/FamNPC";
import charactersDataConfig from "../../src/data/charactersDataConfig";
import {CHARACTERS} from "../../src/gameEngine/gameConstants";

function createFamNPC(col: number, row: number) {
  return new FamNPC({
    col,
    row,
    characterLevel: 1,
    spawningTileLocationID: null
  }, charactersDataConfig[CHARACTERS.FAM_NPC]);
}

export default createFamNPC;