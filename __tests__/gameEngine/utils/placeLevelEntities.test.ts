/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import React from 'react';
import createSystemArgs from '../../__TEST__UTILS__/createSystemArguments';
import placeLevelEntities from 'utils/placeLevelEntities';
import {CHARACTERS} from 'gameConstants';
import {Entity} from 'BaseEntity';
import {ANIMATION_COMP} from 'components/ComponentNamesConfig';
import SpyFns from "../../__TEST__UTILS__/SpyFns";

describe('Tests the placeLevelEntities util', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('places some entities', () => {
    let {tileIdxMap} = createSystemArgs(new SpyFns());
    placeLevelEntities({
      locations: [],
      levelName: 'TEST',
      startPos: {
        col: 0,
        row: 0,
      },
      tileMap: [[1]],
      triggers: {
        levelStart: [],
        actOnEntity: {},
        move: {}
      },
      entitiesToPlace: [
        {
          characterType: CHARACTERS.FAM_NPC,
          characterLevel: 1,
          name: 'NPC_1',
          pos: {
            col: 2,
            row: 2
          }
        },
        {
          characterType: CHARACTERS.ENEMY,
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
    }, tileIdxMap);

    let entsPlaced = Entity.getByComp(ANIMATION_COMP);
    expect(entsPlaced.length).toBe(2); // and not 3
  });
});