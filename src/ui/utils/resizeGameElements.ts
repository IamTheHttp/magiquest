function resizeGameElements(isEditing = false) {
  let widthToHeight = 1.6666; // TODO is this magical ?
  let editorHeight = isEditing ? 170 : 0;
  let UIHeight = 100;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight - UIHeight - editorHeight;
  let newWidthToHeight = newWidth / newHeight;

  let gameArea = document.querySelector('.wrapper') as HTMLElement;
  let gameUI = document.querySelector('.game-ui') as HTMLElement;

  if (gameArea) {
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameUI.style.width = `${newWidth}px`;
      gameUI.style.marginLeft = 'auto';
      gameUI.style.marginRight = 'auto';
      gameArea.style.height = `${newHeight}px`;
      gameArea.style.width = `${newWidth}px`;
    } else {
      newHeight = newWidth / widthToHeight;
      gameArea.style.height = `${newHeight}px`;
      gameArea.style.width = `${newWidth}px`;
    }
  }
}

export default resizeGameElements;