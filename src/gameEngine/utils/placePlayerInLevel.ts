import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import updateMapTileIdx from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {IZone, ITileCoordinate} from '../../interfaces/IZones';
import {ITileIndexMap} from '../../interfaces/IGeneral';
import {placeableEntityMap} from '../../data/placeableEntityMap';
import {Entity} from 'game-platform';
import Player from '../entities/placeableEntities/Player';
import {BaseEntity} from '../BaseEntity';
import {PLACEABLE_ENTITIES} from '../gameConstants';

function placePlayerInLevel(zone: IZone, tileIdxMap: ITileIndexMap, targetTile: ITileCoordinate = null) {
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
  let {col, row} = targetTile || zone.playerStartPos;

  let {x, y} = getCenterPosOfGridIdx(col, row);

  if (!player) {
    let playerConfig = placeableEntityMap[PLACEABLE_ENTITIES.PLAYER];
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
