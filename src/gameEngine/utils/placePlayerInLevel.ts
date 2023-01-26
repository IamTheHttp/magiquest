import {PLAYER_CONTROLLED_COMP} from 'gameEngine/components/_ComponentNamesConfig';
import {updateIndexedTileMap} from 'gameEngine/utils/systemUtils/move/updateIndexedTileMap';
import {getCenterPosOfGridIdx} from 'gameEngine/utils/componentUtils/positionUtils/getCenterPosOfGridIdx';
import {IZone, ITileCoordinate} from '../../interfaces/IZones';
import {IIndexedTileMap} from '../../interfaces/IGeneral';
import {Entity} from 'game-platform';
import Player from '../entities/placeableEntities/Player';
import {BaseEntity} from '../BaseEntity';
import {IPlaceableEntityData} from '../../interfaces/IPlaceableEntityData';

function placePlayerInLevel(
  zone: IZone,
  indexedTileMap: IIndexedTileMap,
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
  updateIndexedTileMap({entity: player, indexedTileMap: indexedTileMap, newX: x, newY: y});

  return player;
}

export default placePlayerInLevel;
