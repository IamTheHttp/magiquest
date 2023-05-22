export function getZones() {
  return fetch('http://localhost:3000/zones')
    .then((r) => {
      return r.json();
    })
    .then((zonesResponse) => {
      if (zonesResponse.status === 'OK') {
        return zonesResponse.data;
      } else {
        console.error('Cannot fetch zones', zonesResponse);
      }
    });
}
