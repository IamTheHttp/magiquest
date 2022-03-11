import Game from '../../../gameEngine/Game';

export function updateEditorServerTile(game: Game, col: number, row: number, tileType: number) {
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      act: game.currentAct,
      chapter: game.currentChapter,
      tileType,
      col,
      row
    })
  });
}
