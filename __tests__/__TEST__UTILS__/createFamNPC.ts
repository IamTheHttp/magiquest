import {CHARACTERS} from "gameConstants";
import charactersDataConfig from "../../src/data/charactersDataConfig";
import FamNPC from "entities/characters/FamNPC";

function createFamNPC(col: number, row: number) {
  return new FamNPC({
    col,
    row,
    characterLevel: 1,
    spawningTileLocationID: null
  }, charactersDataConfig[CHARACTERS.FAM_NPC]);
}

export default createFamNPC;