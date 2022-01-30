const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', '*'); // update to match the domain you will make the request from

  res.send();
});

app.post('/', (req, res) => {
  let {act, chapter, col, row, tileType} = req.body;

  const MAP_FILE_NAME = `../src/zones/${act}-${chapter}/${act}-${chapter}.map.json`;
  const zone = JSON.parse(fs.readFileSync(MAP_FILE_NAME, 'utf-8'));
  zone[row][col] = tileType;

  fs.writeFileSync(MAP_FILE_NAME, JSON.stringify(zone));
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.send('OK');
});

app.listen(port, () => console.log(`Editor app listening on port ${port}!`));
