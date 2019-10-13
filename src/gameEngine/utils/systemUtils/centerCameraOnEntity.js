
function centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight) {
  let {x, y} = entity.getPos();
  let {panX, panY} = mapAPI.getPan();
  
  let panToX = x < viewWidth / 2 ?  panX : -x + viewWidth / 2;
  let panToY = y < viewHeight / 2 ?  panY : -y + viewHeight / 2;
  
  
  if (x + viewWidth / 2 > mapWidth) {
    panToX = panX;
  }
  
  if (y + viewHeight / 2 > mapHeight) {
    panToY = panY;
  }
  
  
  mapAPI.pan(panToX, panToY);
  game.requestBackgroundRender();
  // pan to user
}


export default centerCameraOnEntity;