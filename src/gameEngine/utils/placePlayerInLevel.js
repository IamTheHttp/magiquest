import {PLAYER_CONTROLLED_COMP} from 'components/ComponentNamesConfig';
import Player from 'entities/Player';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';
import {Entity} from 'BaseEntity';
import {bit} from 'config';

function placePlayerInLevel(levelArea, tileIdxMap) {
  /** @type {BaseEntity} */
  let player = Entity.getByComps(PLAYER_CONTROLLED_COMP)[0];
  let {col, row} = levelArea.startPos;
  let x = col * bit + (bit / 2);
  let y = row * bit + (bit / 2);

  if (!player) {
    player = new Player({x, y});
  } else {
    player.setPos({x, y});
    player.stop();
  }
  updateMapTileIdx({entity: player, tileIdxMap, newX: x, newY: y});

  return player;
}

export default placePlayerInLevel;

