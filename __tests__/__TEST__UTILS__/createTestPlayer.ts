import Player from '../../src/gameEngine/entities/characters/Player';
import {charactersDataConfig} from '../../src/data/charactersDataConfig';
import {CHARACTERS} from '../../src/gameEngine/gameConstants';

function createTestPlayer(col: number, row: number) {
  return new Player(
    {
      col,
      row,
      characterLevel: 1,
      spawningTileLocationID: null
    },
    charactersDataConfig[CHARACTERS.PLAYER]
  );
}

export default createTestPlayer;
