import {AllowedLevelLocationIDs, CHARACTERS} from "gameConstants";
import charactersDataConfig from "../../src/data/charactersDataConfig";
import Player from "entities/characters/Player";


function createTestPlayer(col: number, row: number) {
  return new Player({
    col,
    row,
    characterLevel: 1,
    spawningTileLocationID: null
  }, charactersDataConfig[CHARACTERS.PLAYER]);
}

export default createTestPlayer;