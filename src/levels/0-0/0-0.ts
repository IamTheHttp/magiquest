import oneMap from './0-0.map.json';
import {CHARACTERS} from 'gameConstants';
import {ILevelArea, PossibleTriggersArray} from "../../interfaces/levels.i";
import townLocation from "./locations/town";
import spawnableOneLocation from "./locations/spawnable_1";
import mergeStaticLevelAreaData from "../utils/mergeStaticLevelAreaData";

let level: ILevelArea = {
  levelAreaID: '0-0',
  noSpawnLocations:[], // Filled by static csv data
  monsterDensity:0, // Filled by static csv data
  spawnableEnemies:[], // Filled by static csv data
  startPos: null, // Filled by static csv data
  locations: [
    townLocation,
    spawnableOneLocation
  ],
  tileMap: oneMap,
  triggers: {
    levelStart: [{
      oneOff: true,
      type: 'dialog',
      lines: [
        {
          text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
          speaker: 0
        }
      ]
    }] as PossibleTriggersArray,
    actOnEntity: {},
    move: { // Extended by static csv data
      '-1,-2': [{
        oneOff: true,
        type: 'dialog',
        lines: [
          {
            text: 'I should collect my sword\n(hit space to open chests)',
            speaker: 0
          }
        ]
      }] as PossibleTriggersArray
    }
  },
  entitiesToPlace: [
    {
      pos: {
        col: 6,
        row: 6
      },
      characterType: CHARACTERS.CHEST,
      characterLevel: 1,
      name: 'Chest 1'
    },
    {
      pos: {
        col: 8,
        row: 4
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_1'
    },
    {
      pos: {
        col: 13,
        row: 7
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_2'
    },
    {
      pos: {
        col: 18,
        row: 10
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_3'
    },
    {
      pos: {
        col: 5,
        row: 9
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_4'
    },
    {
      pos: {
        col: 62,
        row: 42
      },
      characterType: CHARACTERS.FAM_NPC,
      characterLevel: 1,
      name: 'NPC_5'
    }
  ],
};

export default mergeStaticLevelAreaData(level);
