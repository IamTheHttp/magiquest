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
      entitiesToPlace: [
        {
          type: CHARACTERS.FAM_NPC,
          name: 'NPC_1',
          pos: {
            col: 2,
            row: 2
          }
        },
        {
          type: CHARACTERS.SENTRY,
          name: 'SENTRY_1',
          pos: {
            col: 2,
            row: 2
          }
        },
        {
          type: 'UNKNOWN_TYPE_OMG',
          name: 'SENTRY_1',
          pos: {
            col: 2,
            row: 2
          }
        }
      ],
    }, tileIdxMap);

    let entsPlaced = Entity.getByComps(ANIMATION_COMP);
    expect(entsPlaced.length).toBe(2); // and not 3
  });
});