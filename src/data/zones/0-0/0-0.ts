import oneMap from './0-0.map.json';
import {IZone, PossibleTriggersArray} from '../../../interfaces/IZones';
import townLocation from './locations/town';
import spawnableOneLocation from './locations/spawnable_1';
import {mergeStaticZoneData} from '../utils/mergeStaticZoneData';
import {CHARACTERS} from '../../../gameEngine/gameConstants';

let zone: IZone = {
  zoneID: '0-0',
  noSpawnLocations: [], // Filled by static json data
  monsterDensity: 0, // Filled by static json data
  spawnableEnemies: [], // Filled by static json data
  startPos: null, // Filled by static json data
  locations: [townLocation, spawnableOneLocation],
  tileMap: oneMap,
  triggers: {
    levelStart: [
      {
        oneOff: true,
        type: 'dialog',
        lines: [
          {
            text: "I haven't heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?",
            speaker: 0
          }
        ]
      }
    ] as PossibleTriggersArray,
    actOnEntity: {},
    move: {
      // Extended by static json data
      '-1,-2': [
        {
          oneOff: true,
          type: 'dialog',
          lines: [
            {
              text: 'I should collect my sword\n(hit space to open chests)',
              speaker: 0
            }
          ]
        }
      ] as PossibleTriggersArray
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
  ]
};

export const ZERO_ZERO = mergeStaticZoneData(zone);
