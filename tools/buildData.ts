import charData from '../src/levels/charactersDataConfig';
import {ICoordinates} from "game-platform/types/lib/interfaces";
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
process.chdir(__dirname);


const csvFilePath = path.resolve('../src/levels/levels.csv');

interface ICSVRow {
  id: string, // "LEVEL-AREA" format
  level: string, // number like
  area: string, // number like
  description: string,
  player_start_pos: string, // "x,y" format
  monster_spawns: string, // "MONS_A, MOBS_B" format
  exits: string, //  "5,3->0-1@0,0 __ 5,3->0-1@0,0" -- EXIT_CORD->LEVEL-AREA@ENTER_CORD
  mon_per_tile: string // number like
}

interface IExits {
  [key: string]: { // key in the form of "x,y"
    area: number,
    level: number
  }
}

interface IParsedCSVRow {
  id: string, // "LEVEL-AREA" format
  level: number,
  area: number,
  description: string,
  player_start_pos: ICoordinates,
  monster_spawns: string[],
  exits: IExits,
  mon_per_tile: number
}


/**
 * Validate:
 * - All monsters exist by name somewhere
 * - All level IDs have proper directories in /levels (0-0 exists, 0-1 exists etc.)
 * - Ensure player_start_pos is not out of map
 */

csv()
  .fromFile(csvFilePath)
  .then((allLevels: ICSVRow[]) => {
    let parsedLevelsList: IParsedCSVRow[] = [];


    allLevels.forEach((lvl) => {
      let EXITS: IExits = {};
      let MONSTER_SPAWNS: string[];
      let PLAYER_START_POS: ICoordinates;

      // parse player start post
      let [x, y] = lvl.player_start_pos.split(',');
      PLAYER_START_POS = {x: +x, y: +y};

      // parse monster_spawns by ID
      MONSTER_SPAWNS = lvl.monster_spawns.split(',');

      // parse exists
      let levelExits: string[] = lvl.exits.split('__');
      levelExits.forEach((exit) => {
        let [sourcePosition, encodedTargetLevel] = exit.split('->');
        if (!encodedTargetLevel) {
          return;
        }
        let [targetLevelID, targetTilePosition] = encodedTargetLevel.split('@');
        let [targetLevel, targetArea] = targetLevelID.split('-');

        EXITS[sourcePosition.trim()] = {
          area: +targetArea,
          level: +targetLevel
        }
      });

      // Push parsed level


      // Run tests/validations
      let parsedLevel:IParsedCSVRow = {
        id: lvl.id,
        level: +lvl.level,
        area: +lvl.area,
        description: lvl.description,
        player_start_pos: PLAYER_START_POS,
        monster_spawns: MONSTER_SPAWNS,
        exits: EXITS,
        mon_per_tile: +lvl.mon_per_tile
      };

      // Validate that the level/area id exists in the file structure
      // a level is built from csv data +
      function validateLevelID(id: string) {
        let stat = fs.statSync(`../src/levels/${id}`);
      }
      validateLevelID(parsedLevel.id);
      parsedLevelsList.push(parsedLevel);
    });


    fs.writeFileSync('../src/levels/levels.json', JSON.stringify(parsedLevelsList, null, '\t'));
    console.log('Done - Writing database files');
  });
