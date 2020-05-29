import {ILevelArea} from "../../interfaces/levels.i";

function saveToServer(levelArea: ILevelArea) {
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      levelAreaID: levelArea.levelAreaID,
      tileMap: levelArea.tileMap
    }),
  }).catch(() => {
    alert('Could not save to server');
  });
}

export default saveToServer;