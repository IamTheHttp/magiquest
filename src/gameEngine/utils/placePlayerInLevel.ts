import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import Player from 'entities/characters/Player';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
import {bit} from 'gameEngine/config';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ILevelArea, ITileCoordinate} from "../../interfaces/levels.i";
import {ITileIndexMap} from "../../interfaces/interfaces";
import charactersDataConfig from "../../data/charactersDataConfig";
import {CHARACTERS} from "gameConstants";
import {ICoordinates} from "game-platform/types/lib/interfaces";

function placePlayerInLevel(levelArea: ILevelArea, tileIdxMap: ITileIndexMap, targetTile: ITileCoordinate = null) {
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;
  let {col, row} = targetTile || levelArea.startPos;

  let {x, y} = getCenterPosOfGridIdx(col, row);

  if (!player) {
    let playerConfig = charactersDataConfig[CHARACTERS.PLAYER];
    // TODO - when Saving progress, this has to be taken into consideration (characterLevel 1)
    player = new Player({col, row, characterLevel: 1, spawningTileLocationID: null}, playerConfig);
  } else {
    player.setPos({x, y});
    player.stop();
  }
  updateMapTileIdx({entity: player, tileIdxMap, newX: x, newY: y});

  return player;
}

export default placePlayerInLevel;

