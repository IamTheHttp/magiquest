export function deleteZone(id: string): Promise<{
  status: 'OK' | 'ERROR';
  message: string;
}> {
  return fetch(`http://localhost:3000/zones/${id}`, {
    method: 'DELETE'
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}
