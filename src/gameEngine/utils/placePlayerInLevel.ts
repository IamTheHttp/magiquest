import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/ComponentNamesConfig';
import {updateMapTileIdx} from 'gameEngine/utils/systemUtils/move/updateMapTileIdx';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {IZone, ITileCoordinate} from '../../interfaces/IZones';
import {ITileIndexMap} from '../../interfaces/IGeneral';
import {Entity} from 'game-platform';
import Player from '../entities/placeableEntities/Player';
import {BaseEntity} from '../BaseEntity';
import {IPlaceableEntityData} from '../../interfaces/IPlaceableEntityData';

function placePlayerInLevel(
  zone: IZone,
  tileIdxMap: ITileIndexMap,
  targetTile: ITileCoordinate = null,
  playerData: IPlaceableEntityData
) {
  let player = Entity.getByComp<BaseEntity>(PLAYER_CONTROLLED_COMP)[0];
  let {col, row} = targetTile || zone.playerStartPos;

  let {x, y} = getCenterPosOfGridIdx(col, row);

  if (!player) {
    // TODO - when Saving progress, this has to be taken into consideration (entityLevel 1)
    player = new Player({col, row, entityLevel: 1, spawningTileLocationID: null}, playerData);
  } else {
    player.setPos({x, y});
    player.stop();
  }
  updateMapTileIdx({entity: player, tileIdxMap, newX: x, newY: y});

  return player;
}

export default placePlayerInLevel;
