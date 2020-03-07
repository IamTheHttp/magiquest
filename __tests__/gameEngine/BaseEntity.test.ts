/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import BaseEntity from 'BaseEntity';

describe('Tests the Base Entity', () => {
  let entity: BaseEntity;
  beforeEach(() => {
    // setup the test
    entity = new BaseEntity('foo');
  });

  it('can get pos even if no pos component exists', () => {
    entity.getPos();
  });
});