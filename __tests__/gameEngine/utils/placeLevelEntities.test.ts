import React from 'react';
import createSystemArgs from '../../__TEST__UTILS__/createTestSystemArguments';
import SpyFns from '../../__TEST__UTILS__/SpyFns';
import {Entity} from 'game-platform';
import placeLevelEntities from '../../../src/gameEngine/utils/placeLevelEntities';
import {LEVEL_COMP} from '../../../src/gameEngine/components/ComponentNamesConfig';
import {BaseEntity} from '../../../src/gameEngine/BaseEntity';
import {PLACEABLE_ENTITIES} from '../../../src/gameEngine/gameConstants';
import {createTestPlaceableEntity} from '../../__TEST__UTILS__/createTestPlaceableEntity';

describe('Tests the placeLevelEntities util', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('places some entities', () => {
    let {tileIdxMap} = createSystemArgs(new SpyFns());
    placeLevelEntities(
      {
        chapter: 0,
        act: 0,
        exits: {},
        description: '',
        noSpawnLocations: [],
        monsterDensity: 0,
        spawnableEnemies: [],
        locations: [],
        id: 'TEST',
        playerStartPos: {
          col: 0,
          row: 0
        },
        tileMap: [[1]],
        triggers: {
          levelStart: [],
          actOnEntity: {},
          move: {}
        },
        entitiesToPlace: [
          {
            characterType: PLACEABLE_ENTITIES.FAM_NPC,
            characterLevel: 1,
            name: 'NPC_1',
            pos: {
              col: 2,
              row: 2
            }
          },
          {
            characterType: PLACEABLE_ENTITIES.IMP,
            characterLevel: 1,
            name: 'ENEMY_1',
            pos: {
              col: 2,
              row: 2
            }
          },
          {
            characterType: 'UNKNOWN_TYPE_OMG' as any, // Force a wrong type for the test
            characterLevel: 1,
            name: 'ENEMY_1',
            pos: {
              col: 2,
              row: 2
            }
          }
        ]
      },
      tileIdxMap,
      {
        [PLACEABLE_ENTITIES.FAM_NPC]: createTestPlaceableEntity({id: PLACEABLE_ENTITIES.FAM_NPC}),
        [PLACEABLE_ENTITIES.IMP]: createTestPlaceableEntity({id: PLACEABLE_ENTITIES.IMP})
      }
    );

    // Expected an assertion error in this test, as we have an UNKNOWN_TYPE
    let entsPlaced = Entity.getByComp<BaseEntity>(LEVEL_COMP);
    expect(entsPlaced.length).toBe(2); // and not 3
  });
});
