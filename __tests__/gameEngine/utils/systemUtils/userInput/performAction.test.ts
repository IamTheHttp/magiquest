/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import React from 'react';
import {Entity} from 'BaseEntity';
import performAction from 'utils/systemUtils/userInput/performAction';
import Player from 'entities/Player';
import createSystemArgs from '../../../../__TEST__UTILS__/createSystemArguments';
import Sentry from 'entities/Sentry';
import {DIRECTIONS} from 'gameConstants';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';
import {IS_ATTACKING_COMP} from 'components/ComponentNamesConfig';
import SpyFns from "../../../../__TEST__UTILS__/SpyFns";

describe('Tests the placeLevelEntities util', () => {
  let systemArguments = null;

  /**
   *
   * @type {BaseEntity}
   */
  let player = null;
  beforeEach(() => {
    // setup the test
    Entity.reset();

    player = new Player({col: 0, row:0});
    systemArguments = createSystemArgs(new SpyFns());
  });

  it('performs an action when there is no adjacent entity', () => {
    performAction(systemArguments);
  });

  it('Performs an action on an enemy entity(attack)', () => {
    let sentry = new Sentry({col: 0, row:1});
    updateMapTileIdx({entity: sentry, tileIdxMap: systemArguments.tileIdxMap, newX: sentry.getPos().x, newY: sentry.getPos().y });
    updateMapTileIdx({entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });

    player.setOrientation(DIRECTIONS.DOWN);

    performAction(systemArguments);

    expect(player.hasComponents(IS_ATTACKING_COMP)).toBeTruthy();
    // expect action to attack
  });

  it('Acts on triggers in a tile', () => {
    // TODO set up a trigger on the systemArguments
    // TODO set orientation for the player
    // TODO perform action
  });

  it('if no triggers or entities in target tile', () => {
    // TODO set up a trigger on the systemArguments
    // TODO set orientation for the player
    // TODO perform action
  });

  it('tests invalid target tiles', () => {
    // TODO set up a trigger on the systemArguments
    // TODO set orientation for the player
    // TODO perform action
  });
});