
function centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight) {
  let {x, y} = entity.getPos();
  let {panX, panY} = mapAPI.getPan();
  
  let panToX = x < viewWidth / 2 ?  panX : -x + viewWidth / 2;
  let panToY = y < viewHeight / 2 ?  panY : -y + viewHeight / 2;
  
  // if we don't need to pan, stop
  if (panX === panToX && panY === panToY) {
    return;
  }
  
  if (x + viewWidth / 2 > mapWidth) {
    panToX = panX;
  }
  
  if (y + viewHeight / 2 > mapHeight) {
    panToY = panY;
  }
  
  game.requestBackgroundRender();
  mapAPI.pan(panToX, panToY);
}


export default centerCameraOnEntity;