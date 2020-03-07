import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import Player from 'gameEngine/entities/Player';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
import {bit} from 'gameEngine/config';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ILevelArea} from "../../interfaces/levels.i";
import {ITileIndexMap} from "../../interfaces/interfaces";

function placePlayerInLevel(levelArea: ILevelArea, tileIdxMap: ITileIndexMap) {
  /** @type {BaseEntity} */
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;
  let {col, row} = levelArea.startPos;

  let {x, y} = getCenterPosOfGridIdx(col, row);

  if (!player) {
    player = new Player({col, row});
  } else {
    player.setPos({x, y});
    player.stop();
  }
  updateMapTileIdx({entity: player, tileIdxMap, newX: x, newY: y});

  return player;
}

export default placePlayerInLevel;

