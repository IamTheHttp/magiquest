import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import Player from 'entities/characters/Player';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import BaseEntity, {Entity} from 'gameEngine/BaseEntity';
import {bit} from 'gameEngine/config';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {ILevelArea} from "../../interfaces/levels.i";
import {ITileIndexMap} from "../../interfaces/interfaces";
import charactersDataConfig from "../../data/charactersDataConfig";
import {CHARACTERS} from "gameConstants";

function placePlayerInLevel(levelArea: ILevelArea, tileIdxMap: ITileIndexMap) {
  let player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0] as BaseEntity;
  let {col, row} = levelArea.startPos;

  let {x, y} = getCenterPosOfGridIdx(col, row);

  if (!player) {
    let playetConfig = charactersDataConfig[CHARACTERS.PLAYER];
    // TODO - when Saving progress, this has to be taken into consideration (characterLevel 1)
    player = new Player({col, row, characterLevel: 1, spawningTileLocationID: null}, playetConfig);
  } else {
    player.setPos({x, y});
    player.stop();
  }
  updateMapTileIdx({entity: player, tileIdxMap, newX: x, newY: y});

  return player;
}

export default placePlayerInLevel;

