const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*"); // update to match the domain you will make the request from

  res.send();
});

app.post('/', (req, res) => {
  console.log(req.body.levelName);

  fs.writeFileSync(`../src/levels/data/${req.body.levelName}.json`, JSON.stringify(req.body.tileMap));
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.send('OK');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));