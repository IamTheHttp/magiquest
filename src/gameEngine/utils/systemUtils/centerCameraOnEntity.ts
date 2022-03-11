import Game from '../../Game';
import {BaseEntity} from '../../BaseEntity';
import {Painter} from 'game-platform/dist/lib/PainterAPI/Painter';

function centerCameraOnEntity(
  entity: BaseEntity,
  mapAPI: Painter,
  game: Game,
  viewWidth: number,
  viewHeight: number,
  mapWidth: number,
  mapHeight: number,
  force = false
) {
  let {x, y} = entity.getPos();
  let {panX, panY} = mapAPI.getCurrentPanValue();

  let panToX = x < viewWidth / 2 ? panX : -x + viewWidth / 2;
  let panToY = y < viewHeight / 2 ? panY : -y + viewHeight / 2;

  // if we don't need to pan, stop
  if (panX === panToX && panY === panToY && !force) {
    return;
  }

  game.requestBackgroundRender();

  // If we reached the edge
  if (mapHeight + panToY < viewHeight) {
    panToY = viewHeight - mapHeight;
  }

  if (mapWidth + panToX < viewWidth) {
    panToX = viewWidth - mapWidth;
  }

  mapAPI.panCamera(panToX, panToY);
}

export default centerCameraOnEntity;
