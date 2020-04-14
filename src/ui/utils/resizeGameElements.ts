function resizeGameElements(isEditing = false) {
  let gameArea = document.querySelector('.wrapper') as HTMLElement;
  let gameUI = document.querySelector('.game-ui') as HTMLElement;
  let widthToHeight = 1.6666; // TODO is this magical ?
  let editorHeight = isEditing ? 170 : 0;

  let gameUIStyles = window.getComputedStyle(gameUI);
  let gameUIWidthStyle = gameUIStyles.getPropertyValue('width');

  let gameUIWidth = +gameUIWidthStyle.replace('px', '');
  let newWidth = window.innerWidth - gameUIWidth;
  let newHeight = window.innerHeight - editorHeight;
  let newWidthToHeight = newWidth / newHeight;

  gameArea.style.marginRight = `${gameUIWidth}px`;

  if (gameArea) {
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
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