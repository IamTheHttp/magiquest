import {ITileCoordinate} from "../src/interfaces/zones.i";

process.chdir(__dirname);

const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

import IParsedLevelCSVRow, {IExits, INoSpawnLocation} from "../src/interfaces/IParsedLevelCSVRow"
import {ATTACK_SPEEDS_OPTIONS, CHARACTERS} from "../src/gameEngine/gameConstants";
import {IParsedCharacterCSVMap} from "../src/interfaces/IParsedCharacterCSVRow";


/**
 * Interface depicting the structure of the level.csv shape
 */
interface ICSVRow {
  id: string, // "LEVEL-AREA" format
  level: string, // number like
  area: string, // number like
  description: string,
  player_start_pos: string, // "x,y" format
  monster_spawns: string, // "MONS_A, MOBS_B" format
  exits: string, //  "5,3->0-1@0,0 __ 5,3->0-1@0,0" -- EXIT_CORD->LEVEL-AREA@ENTER_CORD
  mon_per_tile: string // number like
  no_spawn_locations: string
}


function buildLevels() {
  /**
   * Validate:
   * - All monsters exist by name somewhere
   * - All level IDs have proper directories in /levels (0-0 exists, 0-1 exists etc.)
   * - Ensure player_start_pos is not out of map
   */
  csv()
    .fromFile(path.resolve('../src/data/csv/zones.csv'))
    .then((allLevels: ICSVRow[]) => {
      let parsedLevelsList: IParsedLevelCSVRow[] = [];


      allLevels.forEach((csvLevelRow) => {
        let EXITS: IExits = {};
        let MONSTER_SPAWNS: CHARACTERS[];
        let PLAYER_START_POS: ITileCoordinate;
        let NO_SPAWN_LOCATIONS: INoSpawnLocation[] = [];

        // parse player start post
        let [x, y] = csvLevelRow.player_start_pos.split(',');
        PLAYER_START_POS = {col: +x, row: +y};

        // parse monster_spawns by ID
        MONSTER_SPAWNS = csvLevelRow.monster_spawns.split(',') as CHARACTERS[];

        // parse exists
        let levelExits: string[] = csvLevelRow.exits.split('__');
        levelExits.forEach((exit) => {
          let [sourcePosition, encodedTargetLevel] = exit.split('->');
          if (!encodedTargetLevel) {
            return;
          }
          let [targetLevelID, targetTilePosition] = encodedTargetLevel.split('@');
          let [targetLevel, targetArea] = targetLevelID.split('-');
          let [targetX, targetY] = targetTilePosition.split(',');

          EXITS[sourcePosition.trim()] = {
            area: +targetArea,
            level: +targetLevel,
            exitTile: {
              col: +targetX,
              row: +targetY
            }
          }
        });


        // parse no_spawn_locations
        // The format is 0,0-5,5 __ 11,12-50-50
        // split by __ to get a list of safe spots
        // split each spot by - to get coordinates
        // split each coordinate by , to get x,y
        let safeLocationsInStr = csvLevelRow.no_spawn_locations.split('__');

        safeLocationsInStr.forEach((safeLocStr: string) => {
          let [start, end] = safeLocStr.split('-');
          let [startX, startY] = start.split(',');
          let [endX, endY] = end.split(',');
          NO_SPAWN_LOCATIONS.push({
            start: {
              x: +startX,
              y: +startY
            },
            end: {
              x: +endX,
              y: +endY
            }
          })
        });

        // Push parsed level
        let parsedLevel: IParsedLevelCSVRow = {
          id: csvLevelRow.id,
          level: +csvLevelRow.level,
          area: +csvLevelRow.area,
          description: csvLevelRow.description,
          player_start_pos: PLAYER_START_POS,
          monster_spawns: MONSTER_SPAWNS,
          exits: EXITS,
          mon_per_tile: +csvLevelRow.mon_per_tile,
          no_spawn_locations: NO_SPAWN_LOCATIONS
        };

        // Run tests/validations
        // Validate that the level/area id exists in the file structure
        // a level is built from csv data +
        function validateLevelID(id: string) {
          let stat = fs.statSync(`../src/levels/${id}`);
        }

        validateLevelID(parsedLevel.id);
        parsedLevelsList.push(parsedLevel);
      });


      fs.writeFileSync('../src/data/levels.json', JSON.stringify(parsedLevelsList, null, '\t'));
      console.log('Done - Writing database files');
    });
}


interface ICSVCharacterRow {
  id: CHARACTERS,
  display_name: string;
  dmg: number;
  health: number;
  speed: number;
  vision: number;
  attack_speed: ATTACK_SPEEDS_OPTIONS;
  radius: number;
  animation_types: string;
}

function buildCharacters() {
  /**
   * Validate:
   * - All monsters exist by name somewhere (Characters Enum)
   * - Attack speeds make sense ( > 0 < 120 range, divisible by something.
   * - Animations exist somewhere.
   */
  csv()
    .fromFile(path.resolve('../src/data/csv/characters.csv'))
    .then((allCharacters: ICSVCharacterRow[]) => {
      let parsedCharacterMap: IParsedCharacterCSVMap = {};

      allCharacters.forEach((csvCharacterRow) => {
        let charID = csvCharacterRow.id as CHARACTERS;
        parsedCharacterMap[charID] = {
          id: csvCharacterRow.id,
          displayName: csvCharacterRow.display_name,
          dmg: +csvCharacterRow.dmg,
          health: +csvCharacterRow.health,
          speed: +csvCharacterRow.speed,
          vision: +csvCharacterRow.vision,
          attackSpeed: csvCharacterRow.attack_speed,
          radius: +csvCharacterRow.radius,
          animationTypes: csvCharacterRow.animation_types
        }
      });


      fs.writeFileSync('../src/data/characters.json', JSON.stringify(parsedCharacterMap, null, '\t'));
      console.log('Done - Writing database files');
    });
}

buildCharacters();
buildLevels();

