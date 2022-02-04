import {IZone} from '../interfaces/IZones';

/**
 * In editor mode, save changes to the server
 * @param zone
 */
function saveToServer(zone: IZone) {
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      IZone: zone.zoneID,
      tileMap: zone.tileMap
    })
  }).catch(() => {
    alert('Could not save to server');
  });
}

export {saveToServer};
