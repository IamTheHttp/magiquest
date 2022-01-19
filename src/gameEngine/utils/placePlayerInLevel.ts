import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {IZone, ITileCoordinate} from "../../interfaces/levels.i";
import {ITileIndexMap} from "../../interfaces/interfaces";
import charactersDataConfig from "../../data/charactersDataConfig";
import {Entity} from "game-platform";
import Player from "../entities/characters/Player";
import {BaseEntity} from "../BaseEntity";
import {CHARACTERS} from "../gameConstants";

function placePlayerInLevel(zone: IZone, tileIdxMap: ITileIndexMap, targetTile: ITileCoordinate = null) {
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
  let {col, row} = targetTile || zone.startPos;

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

