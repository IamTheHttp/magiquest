/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import React from 'react';
import BaseEntity, {Entity} from 'BaseEntity';
import performAction from 'utils/systemUtils/userInput/performAction';
import Player from 'entities/characters/Player';
import createSystemArgs from '../../../../__TEST__UTILS__/createSystemArguments';
import Enemy from 'entities/characters/Enemies/Enemy';
import {DIRECTIONS, DIRECTIONS_OPTIONS} from 'gameConstants';
import updateMapTileIdx from 'utils/systemUtils/move/updateMapTileIdx';
import {IS_ATTACKING_COMP} from 'components/ComponentNamesConfig';
import SpyFns from "../../../../__TEST__UTILS__/SpyFns";
import {ISystemArguments} from "../../../../../src/interfaces/gameloop.i";

describe('Tests the placeLevelEntities util', () => {
  let systemArguments: ISystemArguments = null;
  let player: BaseEntity = null;
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
    let enemy = new Enemy({col: 0, row:1, characterLevel:1});
    updateMapTileIdx({entity: enemy, tileIdxMap: systemArguments.tileIdxMap, newX: enemy.getPos().x, newY: enemy.getPos().y });
    updateMapTileIdx({entity: player, tileIdxMap: systemArguments.tileIdxMap, newX: player.getPos().x, newY: player.getPos().y });

    player.setOrientation(DIRECTIONS_OPTIONS.DOWN);

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