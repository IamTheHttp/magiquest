import Game from '../../../gameEngine/Game';

export function updateEditorStartPos(game: Game, col: number, row: number) {
  const id = `${game.currentAct}-${game.currentChapter}`;

  fetch(`http://localhost:3000/zones/${id}/startPos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      col,
      row
    })
  });
}
