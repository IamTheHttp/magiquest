// const express = require('express');
import express from 'express';
import * as path from 'path';
import * as url from 'url';
import {getAllZoneJSONFiles} from './utils/zones/getAllZoneJSONFiles.js';
import {getTileMapJSON} from './utils/tileMaps/getTileMapJSON.js';
import {setTileMapJSON} from './utils/tileMaps/setTileMapJSON.js';
import {setZoneJSON} from './utils/zones/setZoneJSON.js';
import {deleteTileMapJSON} from './utils/tileMaps/deleteTileMapJSON.js';
import {deleteZoneJSON} from './utils/zones/deleteZoneJSON.js';
import {getZoneJSON} from './utils/zones/getZoneJSON.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 3000;

const DATA_BASE_PATH = path.resolve(__dirname, '..', 'src/data');

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
  const tileMapJSON = getTileMapJSON(act, chapter);
  tileMapJSON.tileMap[row][col] = +tileType; // must be int type!
  setTileMapJSON(act, chapter, tileMapJSON);
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

  // Read the existing zonesData JSON array
  const zones = getAllZoneJSONFiles(DATA_BASE_PATH);

  // Validate that we can't overwrite an existing act/chapter
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    if (zone.act === act && zone.chapter === chapter) {
      res.send({
        status: 'error',
        message: 'Cannot overwrite existing act-chapter zone, please delete first, then create a new one'
      });
      // Stop here!
      return;
    }
  }

  // Create a new tileMap
  const col = [...new Array(numCols)].map(() => 0);
  const tileMap = [...new Array(numRows)].map(() => col);

  const tileMapJSON = {
    act,
    chapter,
    tileMap
  };

  // Save the new TileMapJSON
  setTileMapJSON(act, chapter, tileMapJSON);

  // Create the new zone
  const zoneJSON = {
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
  };

  // Save the new zones
  setZoneJSON(act, chapter, zoneJSON);

  res.send({
    status: 'OK',
    message: 'Zone created successfully',
    data: {
      zoneJSON: zoneJSON,
      tileMapJSON: tileMapJSON
    }
  });
});

app.get('/zones', (req, res) => {
  const zones = getAllZoneJSONFiles(DATA_BASE_PATH);

  res.send({
    status: 'OK',
    data: zones
  });
});

app.delete('/zones/:id', (req, res) => {
  // Delete entry from the zones.json file!
  const [act, chapter] = req.params.id.split('-');

  deleteTileMapJSON(act, chapter);
  deleteZoneJSON(act, chapter);

  // Respond
  res.send({
    status: 'OK',
    message: `zone deleted ${req.params.id}`
  });
});

app.put('/zones/:id/startPos', (req, res) => {
  let {col, row} = req.body;
  const [act, chapter] = req.params.id.split('-');

  const zone = getZoneJSON(act, chapter);

  zone.playerStartPos = {
    col: col,
    row: row
  };

  setZoneJSON(act, chapter, zone);

  // Respond
  res.send({
    status: 'OK',
    message: `Updated start position for ${req.params.id}`
  });
});

app.listen(port, () => console.log(`Editor app listening on port ${port}!`));
