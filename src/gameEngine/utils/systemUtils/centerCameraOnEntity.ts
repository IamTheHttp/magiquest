import {bit} from 'gameEngine/config';
import BaseEntity from "BaseEntity";
import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";
import GameLoop from "Game";

function centerCameraOnEntity(entity: BaseEntity, mapAPI: CanvasAPI, game:GameLoop, viewWidth:number, viewHeight:number, mapWidth:number, mapHeight:number, force = false) {
  let {x, y} = entity.getPos();
  let {panX, panY} = mapAPI.getPan();
  
  let panToX = x < viewWidth / 2 ?  panX : -x + viewWidth / 2;
  let panToY = y < viewHeight / 2 ?  panY : -y + viewHeight / 2;
  
  // if we don't need to pan, stop
  if (panX === panToX && panY === panToY && !force) {
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