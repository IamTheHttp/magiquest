import {UI_AREA_BELOW_CANVAS, WIDTH_TO_HEIGHT_RATIO} from '../IUIConfig';

function resizeGameElements() {
  let UI_AREA = document.querySelector('.game-ui') as HTMLElement;
  let gameArea = document.querySelector('.wrapper') as HTMLElement;
  let widthToHeight = WIDTH_TO_HEIGHT_RATIO;
  // let editorHeight = isEditing ? 170 : 0;

  let newWidth = window.innerWidth;
  let newHeight = Math.min(window.innerHeight, window.innerHeight - UI_AREA_BELOW_CANVAS); // Always leave 200px for the UI at the bottom
  let newWidthToHeight = newWidth / newHeight;

  if (gameArea) {
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameArea.style.height = `${newHeight}px`;
      gameArea.style.width = `${newWidth}px`;
      if (UI_AREA) {
        UI_AREA.style.width = `${newWidth}px`;
        UI_AREA.style.left = `calc(50% - ${newWidth / 2}px`;
      }
    } else {
      newHeight = newWidth / widthToHeight;
      gameArea.style.height = `${newHeight}px`;
      gameArea.style.width = `${newWidth}px`;
      if (UI_AREA) {
        UI_AREA.style.width = `${newWidth}px`;
        UI_AREA.style.left = `calc(50% - ${newWidth / 2}px`;
      }
    }
  }
}

export default resizeGameElements;
