import {IZone} from "../../interfaces/levels.i";

function saveToServer(zone: IZone) {
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      IZone: zone.zoneID,
      tileMap: zone.tileMap
    }),
  }).catch(() => {
    alert('Could not save to server');
  });
}

export default saveToServer;