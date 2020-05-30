const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = __dirname + '/src/levels/levels.csv';




/**
 * Validate:
 * - All monsters exist by name somewhere
 * - All level IDs have proper directories in /levels (0-0 exists, 0-1 exists etc.)
 * - Ensure player_start_pos is not out of map
 */
csv()
  .fromFile(csvFilePath)
  .then((allLevels)=>{
    allLevels.forEach((lvl) => {
      // parse player start post
      let [x, y] = lvl.player_start_pos.split(',');
      lvl.player_start_pos = {x: +x, y: +y};

      // parse monster_spawns by ID
      lvl.monster_spawns = lvl.monster_spawns.split(',');

      // parse exists
      let levelExits = lvl.exits.split('__');
      lvl.exits = {};
      levelExits.forEach((exit) => {
        let [sourcePosition, encodedTargetLevel] = exit.split('->');
        if (!encodedTargetLevel) {
          return;
        }
        let [targetLevelID, targetTilePosition] = encodedTargetLevel.split('@');
        let [targetLevel, targetArea] = targetLevelID.split('-');

        lvl.exits[sourcePosition.trim()] = {
          area: +targetArea,
          level: +targetLevel
        }
      })
    });

    // We mutate allLevels (mutate each row) and then save as JSON
    fs.writeFileSync (__dirname + '/src/levels/levels.json', JSON.stringify(allLevels, null, '\t'));
  });