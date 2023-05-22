import {WIDTH_TO_HEIGHT_RATIO} from '../IUIConfig';

export function resizeGameElements() {
  const EDITOR_TILE_SELECTOR: HTMLElement = document.querySelector('#editor-tile-selector');
  const gameCanvasElement: HTMLElement = document.querySelector('.canvas-main-container');
  const widthToHeight = WIDTH_TO_HEIGHT_RATIO;

  // TILE_SELECTOR is the editor menu on the left
  const TILE_SELECTOR_WIDTH = EDITOR_TILE_SELECTOR ? +EDITOR_TILE_SELECTOR.clientWidth : 0;
  // let editorHeight = isEditing ? 170 : 0;

  let newWidth = window.innerWidth - TILE_SELECTOR_WIDTH;
  let newHeight = Math.min(window.innerHeight, window.innerHeight); // Always leave 200px for the UI at the bottom
  const newWidthToHeight = newWidth / newHeight;

  if (gameCanvasElement) {
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameCanvasElement.style.height = `${newHeight}px`;
      gameCanvasElement.style.width = `${newWidth}px`;
    } else {
      newHeight = newWidth / widthToHeight;
      gameCanvasElement.style.height = `${newHeight}px`;
      gameCanvasElement.style.width = `${newWidth}px`;
    }
  }
}
