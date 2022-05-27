const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', '*'); // update to match the domain you will make the request from
  next();
});

app.post('/', (req, res) => {
  let {act, chapter, col, row, tileType} = req.body;

  const MAP_FILE_NAME = `../src/data/json/maps/${act}-${chapter}.map.json`;
  const zoneTileMap = JSON.parse(fs.readFileSync(MAP_FILE_NAME, 'utf-8'));
  zoneTileMap.tileMap[row][col] = +tileType; // must be int type!

  fs.writeFileSync(MAP_FILE_NAME, JSON.stringify(zoneTileMap));
  res.send('OK');
});

app.post('/zones', (req, res) => {
  const {act, chapter, numRows, numCols} = req.body;

  if (act < 0 || chapter < 0 || numRows <= 0 || numCols <= 0) {
    res.send({
      error: `invalid Input: ${JSON.stringify(req.body)}`
    });

    return;
  }

  // TODO
  //   Create a new map file
  //   Extend the Zone Array

  // Read the existing zonesData JSON array
  const DATA_BASE_PATH = path.resolve(__dirname, '..', 'src/data');
  const ZONES_FILE_NAME = path.resolve(DATA_BASE_PATH, 'json/zones.json');
  const zones = JSON.parse(fs.readFileSync(ZONES_FILE_NAME, 'utf-8'));

  // Validate that we can't overwrite an existing act/chapter
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    if (zone.act === act && zone.chapter === chapter) {
      res.send({
        status: 'error',
        message: 'Cannot overwrite existing act-chapter zone, please delete first, then create new'
      });
      // Stop here!
      return;
    }
  }

  // Create a new ZoneTileMap
  const col = [...new Array(numCols)].map(() => 0);
  const zoneTileMap = [...new Array(numRows)].map(() => col);

  // Save the new TileMap
  const MAP_FILE_NAME = path.resolve(DATA_BASE_PATH, `json/maps/${act}-${chapter}.map.json`);

  fs.writeFileSync(
    MAP_FILE_NAME,
    JSON.stringify(
      {
        act: act,
        chapter: chapter,
        tileMap: zoneTileMap
      },
      null,
      '\t'
    )
  );

  // Create the new level
  zones.push({
    id: `${act}-${chapter}`,
    act: act,
    chapter: chapter,
    description: 'New Chapter',
    playerStartPos: {
      col: 0,
      row: 0
    },
    spawnableEnemies: [],
    exits: {},
    monsterDensity: 0,
    noSpawnLocations: [],
    entitiesToPlace: [],
    triggers: {
      levelStart: [],
      actOnEntity: {},
      move: {}
    },
    locations: []
  });

  // Save the new zones
  fs.writeFileSync(ZONES_FILE_NAME, JSON.stringify(zones, null, '\t'));

  res.send({
    status: 'OK',
    message: 'Zone created successfully'
  });
});

app.listen(port, () => console.log(`Editor app listening on port ${port}!`));
